const Engine = require('../engine');
const Parser = require('./parser')
const { chunkClass } = require('./classify');
const date = new Date();
const year = date.getFullYear();
let month = date.getMonth() + 1;
month = month < 10 ? '0' + month : month;
let day = date.getDate();
day = day < 10 ? '0' + day : day;
const toDay = `${year}-${month}-${day}`;
// const toDay = '2018-08-01';
console.log(toDay);
;(async () => {
  
  const latests = [];
  for (let d of chunkClass) {
    // 找出每个分类最新的id
    // d.latestTime = new Date('2018-07-01').getTime();
    d.latestTime = new Date(toDay).getTime();
    latests.push(d);
  }
  new Engine(latests, Parser, 'zuidazy', 7);
})();
