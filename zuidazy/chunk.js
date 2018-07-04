const Engine = require('../engine');
const Parser = require('./chunk_parser')
const { chunkClass } = require('./classify');
const date = new Date();
const year = date.getFullYear();
let month = date.getMonth();
month = month < 10 ? '0' + month : month;
let day = date.getDay();
day = day < 10 ? '0' + day : day;
const toDay = `${year}-${month}-${day}`;
;(async () => {
  
  const latests = [];
  for (let d of chunkClass) {
    // 找出每个分类最新的id
    // d.latestTime = new Date('2018-06-28').getTime();
    d.latestTime = new Date(toDay).getTime();
    latests.push(d);
  }
  new Engine(latests, Parser, 'zuidazy', 7);
})();
