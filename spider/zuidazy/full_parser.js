const cheerio = require('cheerio');
const model = require('../../model/index');
const { fetch, detailParser } = require('./common');

const host = 'http://www.zuidazy.com/';

function getPrevUrl(url) {
  const matched = url.match(/vod-type-id-(\d+)-pg-(\d+)\.html$/);
  if (!matched) return null;
  const currentId = +matched[1];
  const currentPage = +matched[2];
  if (currentPage <= 1) return null;
  return `${host}?m=vod-type-id-${currentId}-pg-${currentPage - 1}\.html`;
}
exports.listParser = async (queue) => {
  try {
    const data = await fetch(queue.url);
    const $ = cheerio.load(data);
    const queues = [];
    const prevUrl = getPrevUrl(queue.url);
    // 如果还有上一页
    if (prevUrl) {
      queues.push({
        url: prevUrl,
        parser: 'listParser',
        saver: null,
        pid: queue.pid
      });
    }
    $('.xing_vb4>a').each((index, el) => {
      queues.push({
        url: `${host}${el.attribs.href}`,
        parser: 'detailParser',
        saver: 'detailSaver',
        pid: queue.pid
      });
    });
    return { queues };
  } catch (error) {
    model.failModel.create({
      url: queue.url,
      parser: 'listParser',
      saver: null,
      pid: queue.pid
    });
    return null;
  }
}

exports.detailParser = detailParser;
