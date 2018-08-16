const cheerio = require('cheerio');
const model = require('../model');
const request = require('request-promise-native');

const getUserAgent = require('../ua');

const fetch = function(url) {
  return request.get({
    url: url,
    proxy: 'http://127.0.0.1:1087',
    headers: {
      "User-Agent": getUserAgent(),
      "Host": "www.zuidazy.net",
      "Referer": "www.zuidazy.net",
    },
    timeout: 10000,
  });
}
exports.fetch = fetch;
exports.detailParser = async (queue) => {
  try {
    const data = await fetch(queue.url);
    const $ = cheerio.load(data);
    const vodinfoboxs = $('.vodinfobox li');
    const vodplayinfo = $('input[type="checkbox"]').filter((i, e) => {
      return /^(http|https|ftp)\:\/\//.test($(e).attr('value'))
    });
    const remote_url = vodplayinfo.map((i, e) => {
      return { url: $(e).val(), tag: $(e).parent().text().split('$')[0] }
    }).toArray()
    const payload = {
      id: +queue.url.match(/vod-detail-id-(\d+)\.html$/)[1], // 资源id
      latest: $('.vodh > span').text(), // 最近更新
      name: $('.vodh > h2').text(), // 电影名称
      thumbnail: $('.vodImg > img').attr('src'), // 缩略图
      alias: vodinfoboxs.eq(0).find('span').text().split(','), // 别名
      director: vodinfoboxs.eq(1).find('span').text().split(','), // 导演
      starring: vodinfoboxs.eq(2).find('span').text().split(','), // 主演
      region: vodinfoboxs.eq(4).find('span').text(), // 地区
      language: vodinfoboxs.eq(5).find('span').text(), // 语言
      released_at: vodinfoboxs.eq(6).find('span').text(), // 上映时间
      running_time: vodinfoboxs.eq(7).find('span').text(), // 片长
      generated_at: vodinfoboxs.eq(8).find('span').text(), // 更新时间
      introduce: $('.vodplayinfo > span').text().trim().replace(/\n|\t|\r/g, ''), // 影片简介
      href: queue.url, // 抓取链接
      // saved: false, // 是否已经下载完毕
      // remote_url: $('input[type="checkbox"]').map((i, el) => el.attribs.value).toArray().filter(i => /^(http|https|ftp)\:\/\//.test(i)), // 远程下载链接
      remote_url,
      // local_url: [], // 本地链接(已下载)
      pid: queue.pid,
    }
    return { payload, saver: queue.saver };
  } catch (error) {
    model.failModel.create({
      url: queue.url,
      parser: 'detailParser',
      saver: 'detailSaver',
      pid: queue.pid
    });
    return null;
  }
}