const cheerio = require('cheerio');
const model = require('../model/index');
const { fetch, detailParser } = require('./common');

const host = 'http://www.zuidazy.net/';

function getTime (url) {
  return +url.match(/vod-detail-id-(\d+)\.html$/)[1];
}
exports.listParser = async (queue) => {
  try {
    const data = await fetch(queue.url);
    const $ = cheerio.load(data);
    const queues = [];
    const nextUrl = $('.pagenow').next().attr("href");
    const videoLi = $('.xing_vb4');
    videoLi.each((index, el) => {
      const video = $(el).find('a');
      const time = $(el).next().next().text().trim();
      // console.log(new Date(time).getTime(), queue.latestTime)
      if (new Date(time).getTime() >= queue.latestTime) {
        queues.push({
          name: video.text(),
          url: `${host}${video.attr('href')}`,
          parser: 'detailParser',
          saver: 'detailSaver',
          pid: queue.pid
        });
      }
      
    });
    if (nextUrl && queues.length === videoLi.length) {
      // 如果有下一页 并且本页全部都大于最新的id
      queues.push({
        latestTime: queue.latestTime,
        url: `http://www.zuidazy.net${nextUrl}`,
        parser: 'listParser',
        saver: null,
        pid: queue.pid
      });
    }
    return { queues };
  } catch (error) {
    model.failModel.create({
      latestTime: queue.latestTime,
      url: queue.url,
      parser: 'listParser',
      saver: null,
      pid: queue.pid
    });
    return null;
  }
};

exports.detailParser = detailParser;
