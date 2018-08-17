const request = require('request-promise-native');
const parseString = require('xml2js').parseString;
const getUserAgent = require('../ua');

module.exports = class Parser {
  constructor (url, source) {
    this.url = url;
    this.source = source;
  }
  listParser (queue) {
    return new Promise(async (resolve, reject) => {
      try {
        const xmlStr = await this._fetch(queue.url);
        const result = await this._parserXML(xmlStr);
        const queues = [];
        if (!result || result.length === 0) {
          resolve({ queues });
        }
        result.forEach((el) => {
          Object.keys(el).forEach(key => el[key] = this._getJsonVal(el[key]));
    
          if (new Date(el.last).getTime() >= queue.latestTime) {
            queues.push({
              name: el.name,
              url: `${this.url}?ac=videolist&ids=${el.id}`,
              parser: 'detailParser',
              saver: 'detailSaver',
              source: this.source,
              pid: queue.pid
            });
          }
        });
       
        if (queues.length === result.length) {
          let nextUrl = this._getNextUrl(queue.url)
          if (nextUrl !== null) {
            // 如果有下一页 并且本页全部都大于最新的id
            queues.push({
              latestTime: queue.latestTime,
              url: nextUrl,
              parser: 'listParser',
              source: this.source,
              saver: null,
              pid: queue.pid
            });
          }
    
        }
        resolve({ queues });
      } catch (e) {
        reject({
          latestTime: queue.latestTime,
          url: queue.url,
          source: this.source,
          parser: 'listParser',
          saver: null,
          pid: queue.pid
        });
      }
    });
  }
  detailParser (queue) {
    return new Promise(async (resolve, reject) => {
      try {
        const xmlStr = await this._fetch(queue.url);
        const result = await this._parserXML(xmlStr);
        const e = result[0];
        const payload = {
          id: +this._getJsonVal(e.id),
          latest: this._getJsonVal(e.note),
          name: this._getJsonVal(e.name),
          thumbnail: this._getJsonVal(e.pic),
          alias: [],
          director: this._getJsonVal(e.director).split(','),
          starring: this._getJsonVal(e.actor).split(','),
          region: this._getJsonVal(e.area),
          language: this._getJsonVal(e.lang),
          released_at: this._getJsonVal(e.year),
          running_time: 0,
          generated_at: this._getJsonVal(e.last),
          introduce: this._filterHTMLTag(this._getJsonVal(e.des)),
          href: queue.url,
          remote_url: this._parserUrls(this._getJsonVal(e.dl).dd),
          source: this.source,
          pid: queue.pid,
        };
        resolve({ payload, saver: queue.saver });
      } catch (e) {
        reject({
          source: this.source,
          url: queue.url,
          parser: 'detailParser',
          saver: 'detailSaver',
          pid: queue.pid
        });
      }
    });
  }
  // 解析列表地址
  _getListUrl (cid, page) {
    return `${this.url}?ac=list&t=${cid}&pg=${page}`;
  }
  // http请求
  _fetch(url) {
    return request.get({
      url: url,
      // proxy: 'http://127.0.0.1:1087',
      headers: { "User-Agent": getUserAgent(), },
      timeout: 10000,
    });
  }
  // 获取json value
  _getJsonVal(j) {
    if (Array.isArray(j)) {
      return j[0];
    }
    return j;
  }
  // 解析xml
  _parserXML(xmlStr) {
    return new Promise((resolve, reject) => {
      parseString(xmlStr, { explicitArray : true }, function (err, result) {
        if (err) return reject();
        resolve(result.rss.list[0].video);
      });
    });
  }
  // 去除html标记
  _filterHTMLTag(content) {
    content = content.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
    content = content.replace(/[|]*\n/, '') //去除行尾空格
    content = content.replace(/&npsp;/ig, ''); //去掉 npsp
    return content;
  }
  // 解析播放地址
  _parserUrls (obj) {
    let str = obj[0]._;
    str = str.split('#');
    return str.map(function (d) {
      d = d.split('$');
      return { tag: d[0], url: d[1] };
    });
  }
  // 获取下一页列表链接
  _getNextUrl (url) {
    url = url.split('?')[1];
    const reg = /t=(\d+)&pg=(\d+)/;
    const matched = url.match(reg);
    if (!matched) return null;
    const t = matched[1];
    const pg = matched[2];
    url = this._getListUrl(t, +pg + 1);
    return url;
  }
  
}