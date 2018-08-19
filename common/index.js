const Engine = require('./engine');
const Parser = require('./parser');
const zd = require('../classify/zdziyuan');
const ky = require('../classify/kyziyuan');

;(() => {
  new Engine(
    [
      ...zd.classify,
      // ...ky.classify,
    ],
    {
      // 最大资源网
      [zd.source]: new Parser(zd.url, zd.source),
      // 酷云资源网
      // [ky.source]: new Parser(ky.url, ky.source),
    }
  );
})();