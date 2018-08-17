const Engine = require('../common/engine');
const Parser = require('../common/parser');

;(() => {
  new Engine(
    [
      { // 动作片
        url: `http://www.zdziyuan.com/inc/s_api_m3u8.php?ac=list&t=5&pg=1`,
        pid: "5b0fd14e7cad175a34a2ea8a",
        source: "zdziyuan",
        saver: null,
        parser: "listParser",
        latestTime: new Date("2018-08-16").getTime(),
      }
    ],
    {
      // 最大资源网
      "zdziyuan": new Parser("http://www.zdziyuan.com/inc/s_api_m3u8.php", "zdziyuan"),
    }
  );
})();