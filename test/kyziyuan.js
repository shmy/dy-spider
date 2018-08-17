const Engine = require('../common/engine');
const Parser = require('../common/parser');

class KYParser extends Parser {

}
;(() => {
  new Engine(
    [
      { // 动作片
        url: `http://caiji.kuyunzyw.com/inc/s_ldg_kkm3u8.asp?ac=list&t=32&pg=1`,
        pid: "5b0fd14e7cad175a34a2ea8a",
        source: "kyziyuan",
        saver: null,
        parser: "listParser",
        latestTime: new Date("2018-08-16").getTime(),
      }
    ],
    {
      // 最大资源网
      "kyziyuan": new KYParser("http://caiji.kuyunzyw.com/inc/s_ldg_kkm3u8.asp", "kyziyuan"),
    }
  );
})();
