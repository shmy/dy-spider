const Saver = require('../saver')
const model = require('../model');
// 先按分类爬 pid
// 失败的存数据库
// 队列没有值时 拉取数据库失败的列表 加入队列

let requestCount = 0;

class Engine {
  constructor(queues, parsers, max = 10, failModel = model.failModel) {
    this.queues = queues;
    this.parsers = parsers;
    this.max = max;
    this.isFetchFail = false;
    this.failModel = failModel;
    this.timer = null;
    this.run();
  }
  run() {
    this.timer = setInterval(() => {
      if (this.queues.length === 0 && !this.isFetchFail) {
        // 重启失败的队列
        return this.doFailQueues();
      }
      for (let i = 0; i < this.max; i ++) {
        if (this.queues.length) {
          const queue = this.queues.shift();
          requestCount ++;
          this.parsers[queue.source][queue.parser](queue)
            .then(result => {
              requestCount --;
              if (!result) return;
              result.queues && this.put(result.queues);
              (result.payload && result.saver) && this.save(result.payload, result.saver);
            })
            .catch(e => {
              requestCount --;
              this.failModel.create(e);
            });
        }
      }
    }, 1500);
  }
  put(queues) {
    this.queues.push.apply(this.queues, queues);
  }
  async save(payload, saver) {
    try {
      await Saver[saver](payload);
    } catch (error) {
      console.log("保存失败：", error.message);
    }
  }
  async doFailQueues() {
    this.isFetchFail = true;
    const fails = await this.failModel.find({});
    await this.failModel.deleteMany({});
    if (fails.length === 0 && requestCount === 0) {
      clearInterval(this.timer);
      this.timer = null;
      console.log("任务完成");
      process.exit(0);
      return;
    }
    console.log("准备加载失败的任务", fails.length, "还没回来的请求数量", requestCount);
    this.put(fails);
    this.isFetchFail = false;
  }
}

module.exports = Engine;