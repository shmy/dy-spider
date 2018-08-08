const cheerio = require('cheerio');
const model = require('../model');
const request = require('request-promise-native');
const Iconv = require('iconv-lite');
const getUserAgent = require('../ua');

const fetch = function(url) {
  return new Promise((resolve, reject) => {
    request.get({
      encoding: null,
      url: url,
      proxy: 'http://127.0.0.1:1087',
      headers: {
        "User-Agent": getUserAgent(),
        "Host": "www.kuyunzy.net",
        "Referer": "www.kuyunzy.net",
      },
      timeout: 10000
    }).then(data => {
      data = Iconv.decode(data, 'gb2312').toString();
      resolve(data);
    }).catch(reject);
  });
}
exports.fetch = fetch;

exports.detailParser = async (queue) => {
  try {
    const data = await fetch(queue.url);
    const $ = cheerio.load(data);
    const vodinfoboxs = $('table').eq(1);
    const fonts = vodinfoboxs.find('table font');
    var id = +queue.url.match(/detail\/\?(\d+)\.html$/)[1];
    var name = fonts.eq(0).text().trim();
    var latest = fonts.eq(7).text().trim();
    var thumbnail = vodinfoboxs.find('.img img').attr("src").trim();
    var alias = [];
    var director = fonts.eq(3).text().trim().split(' ').filter(function (e) {
      return e.trim();
    });
    var starring = fonts.eq(2).text().trim().split(',');
    var region = fonts.eq(5).text().trim();
    var language = fonts.eq(8).text().trim();
    var released_at = fonts.eq(9).text().trim();
    var generated_at = fonts.eq(6).text().trim();
    var introduce = fonts.eq(10).text().trim();
    var remote_url = $("input[name='copy_yah']").map(function (i, e) {
      var str = $(e).parent().text().split('$');
      return { url: str[1], tag: str[0] };
    }).toArray();
    
    const payload = {
      id, // 资源id
      latest, // 最近更新
      name, // 电影名称
      thumbnail, // 缩略图
      alias, // 别名
      director, // 导演
      starring, // 主演
      region, // 地区
      language, // 语言
      released_at, // 上映时间
      running_time: 0, // 片长
      generated_at, // 更新时间
      introduce, // 影片简介
      href: queue.url, // 抓取链接
      remote_url,
      pid: queue.pid,
    }
    return { payload, saver: queue.saver };
  } catch (error) {
    model.failKunYunZYModel.create({
      url: queue.url,
      parser: 'detailParser',
      saver: 'detailSaver',
      pid: queue.pid
    });
    return null;
  }
}