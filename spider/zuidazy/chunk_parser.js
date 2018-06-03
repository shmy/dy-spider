const cheerio = require('cheerio');
const model = require('../../model/index');
const { fetch, detailParser } = require('./common');

const host = 'http://www.zuidazy.com/';

function getId (url) {
  return +url.match(/vod-detail-id-(\d+)\.html$/)[1];
}
exports.listParser = async (queue) => {
  try {
    const data = await fetch(queue.url);
    const $ = cheerio.load(data);
    const queues = [];
    const nextUrl = $('.pagenow').next().attr("href");
    const videoA = $('.xing_vb4>a');
    videoA.each((index, el) => {
      if (getId(`${host}${el.attribs.href}`) > queue.latestId) {
        queues.push({
          name: $(el).text(),
          url: `${host}${el.attribs.href}`,
          parser: 'detailParser',
          saver: 'detailSaver',
          pid: queue.pid
        });
      }
      
    });
    if (nextUrl && queues.length === videoA.length) {
      // 如果有下一页 并且本页全部都大于最新的id
      queues.push({
        latestId: queue.latestId,
        url: `http://www.zuidazy.com${nextUrl}`,
        parser: 'listParser',
        saver: null,
        pid: queue.pid
      });
    }
    return { queues };
  } catch (error) {
    model.failModel.create({
      latestId: queue.latestId,
      url: queue.url,
      parser: 'listParser',
      saver: null,
      pid: queue.pid
    });
    return null;
  }
};

exports.detailParser = detailParser;
