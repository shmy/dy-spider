const request = require('request-promise-native');
const parseString = require('xml2js').parseString;
const model = require('../model');
const getUserAgent = require('../ua');


const host = 'http://www.zdziyuan.com/inc/s_api_m3u8.php';
const getUrl = (id, page) => `${host}?t=${id}&pg=${page}`;

const fetch = function (url) {
  return request.get({
    url: url,
    headers: {
      "User-Agent": getUserAgent(),
      "Host": "zdziyuan.com",
      "Referer": "zdziyuan.com",
    },
    timeout: 10000,
  });
}

// 获取jsonval
const getJsonVal = function (j) {
  if (Array.isArray(j)) {
    return j[0];
  }
  return j;
}
// 解析xml
const parserXML = function (xmlStr) {
  return new Promise((resolve, reject) => {
    parseString(xmlStr, { explicitArray : true }, async function (err, result) {
      if (err) return reject();
      resolve(result.rss.list[0].video);
    });
  });
}

// 去除html标签
function filterHTMLTag (msg) {
  var msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
  msg = msg.replace(/[|]*\n/, '') //去除行尾空格
  msg = msg.replace(/&npsp;/ig, ''); //去掉npsp
  return msg;
}

function parserUrls (obj) {
  var str = obj[0]._;
  str = str.split('#');
  return str.map(function (d) {
    d = d.split('$');
    return { tag: d[0], url: d[1] };
  });
}
// 获取下一页
function getNextUrl (url) {
  url = url.split('?')[1];
  const reg = /t=(\d+)&pg=(\d+)/;
  const matched = url.match(reg);
  if (!matched) return null;
  var t = matched[1];
  var pg = matched[2];
  url = getUrl(t, +pg + 1);
  
  return url;
}

exports.detailParser = async (queue) => {
  try {
    const xmlStr = await fetch(queue.url);
    const result = await parserXML(xmlStr);
    const e = result[0];
    const payload = {
      id: +getJsonVal(e.id),
      latest: getJsonVal(e.note),
      name: getJsonVal(e.name),
      thumbnail: getJsonVal(e.pic),
      alias: [],
      director: getJsonVal(e.director).split(','),
      starring: getJsonVal(e.actor).split(','),
      region: getJsonVal(e.area),
      language: getJsonVal(e.lang),
      released_at: getJsonVal(e.year),
      running_time: 0,
      generated_at: getJsonVal(e.last),
      introduce: filterHTMLTag(getJsonVal(e.des)),
      href: queue.url,
      remote_url: parserUrls(getJsonVal(e.dl).dd),
      pid: queue.pid,
    };
    return { payload, saver: queue.saver };
  } catch (e) {
    model.failModel.create({
      url: queue.url,
      parser: 'detailParser',
      saver: 'detailSaver',
      pid: queue.pid
    });
    return null;
  }
}

exports.listParser = async (queue) => {
  try {
    const xmlStr = await fetch(queue.url);
    const result = await parserXML(xmlStr);
    const queues = [];
    if (!result || result.length === 0) {
      return { queues };
    }
    result.forEach((el) => {
      Object.keys(el).forEach(key => el[key] = getJsonVal(el[key]));
      
      if (new Date(el.last).getTime() >= queue.latestTime) {
        queues.push({
          name: el.name,
          url: "http://www.zdziyuan.com/inc/s_api_m3u8.php?ac=videolist&ids=" + el.id,
          parser: 'detailParser',
          saver: 'detailSaver',
          pid: queue.pid
        });
      }
    });
    // if (queues.length === 0) {
    //   console.log(result);
    // }
    // console.log(queues.length, result.length)
    if (queues.length === result.length) {
      var nextUrl = getNextUrl(queue.url)
      if (nextUrl !== null) {
        // 如果有下一页 并且本页全部都大于最新的id
        queues.push({
          latestTime: queue.latestTime,
          url: nextUrl,
          parser: 'listParser',
          saver: null,
          pid: queue.pid
        });
      }
      
    }
    return { queues };
  } catch (e) {
    console.log(e);
    model.failModel.create({
      latestTime: queue.latestTime,
      url: queue.url,
      parser: 'listParser',
      saver: null,
      pid: queue.pid
    });
    return null;
  }
}