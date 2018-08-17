const cheerio = require('cheerio');
const model = require('../model/index');
const { fetch, detailParser } = require('./common');

const host = 'http://www.kuyunzy.net/';
function getNextUrl(currentUrl, totalNum) {
  var currentNum = +currentUrl.match(/-(\d+)\.html$/)[1];
  if (currentNum >= totalNum) {
    return null;
  }
  return currentUrl.replace(`-${currentNum}.html`, `-${currentNum + 1}.html`);
}
exports.listParser = async (queue) => {
  try {
    const data = await fetch(queue.url);
    const $ = cheerio.load(data);
    const queues = [];
    let nextUrl = $('.pages > span').eq(0);
    let totalNum = parseInt(nextUrl.text().split('/')[1]);
    nextUrl = getNextUrl(queue.url, totalNum);
    const table = $('table').eq(1);
    const videoLi = table.find('tr.row');
    videoLi.each((index, el) => {
      const tds = $(el).find('>td');
      const video = tds.eq(0);
      const time = tds.eq(3).text().trim();
      // console.log(new Date(time).getTime(), queue.latestTime)
      if (new Date(time).getTime() >= queue.latestTime) {
        queues.push({
          name: video.text(),
          url: `${host}${video.find("a").attr('href')}`,
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
        url: nextUrl,
        parser: 'listParser',
        saver: null,
        pid: queue.pid
      });
    }
    return { queues };
  } catch (error) {
    model.failKunYunZYModel.create({
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
