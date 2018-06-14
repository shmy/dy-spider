const Engine = require('../engine');
const Parser = require('./chunk_parser')
const { chunkClass } = require('./classify');
;(async () => {
  
  const latests = [];
  for (let d of chunkClass) {
    // 找出每个分类最新的id
    d.latestTime = new Date('2018-06-13').getTime();
    latests.push(d);
  }
  new Engine(latests, Parser, 'zuidazy', 7);
})();
