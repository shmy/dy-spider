const model = require('../../model/index');
const Engine = require('../engine');
const Parser = require('./chunk_parser')
const { chunkClass } = require('./classify');

;(async () => {
  
  const latests = [];
  for (let d of chunkClass) {
    // 找出每个分类最新的id
    const item = await model.videoModel.findOne({ pid: d.pid }).sort({ id: -1 });
    d.latestId = item.id || 0;
    latests.push(d);
  }
  new Engine(latests, Parser, 'zuidazy', 7);
})();
