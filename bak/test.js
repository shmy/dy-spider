const request = require('request-promise-native');
const parseString = require('xml2js').parseString;
const getUserAgent = require('../ua');
// 最新列表
// m3u8
// http://www.zdziyuan.com/inc/s_api_m3u8.php
// pg : 1 页码
// t : 5 分类id
// mp4
// http://www.zdziyuan.com/inc/apidown.php

// 去除html标签
function filterHTMLTag (msg) {
  var msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
  msg = msg.replace(/[|]*\n/, '') //去除行尾空格
  msg = msg.replace(/&npsp;/ig, ''); //去掉npsp
  return msg;
}
// http
function fetch (url) {
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
function getJsonVal (j) {
  if (Array.isArray(j)) {
    return j[0];
  }
  return j;
}
// 解析xml
function parserXML (xmlStr) {
  return new Promise((resolve, reject) => {
    parseString(xmlStr, {explicitArray : true}, async function (err, result) {
      if (err) return reject();
      resolve(result.rss.list[0].video);
    });
  });
}
function parserUrls (obj) {
  var str = obj[0]._;
  str = str.split('#');
  return str.map(function (d) {
    d = d.split('$');
    return { tag: d[0], url: d[1] };
  });
 
}
;(async () => {
  const xmlStr = await fetch("http://www.zdziyuan.com/inc/s_api_m3u8.php?t=17&pg=1");
  const videos = await parserXML(xmlStr);
  if (videos === null) return;
  // ret = [];
  for (let video of videos) {
    var url = "http://www.zdziyuan.com/inc/s_api_m3u8.php?ac=videolist&ids=" + video.id[0];
    const xmlStr = await fetch(url);
    const result = await parserXML(xmlStr);
    result.forEach(function (e) {
      const r = {
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
        href: url,
        remote_url: parserUrls(getJsonVal(e.dl).dd),
      };
      console.log(r);
    })
  }
  
})();