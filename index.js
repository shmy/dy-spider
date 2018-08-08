const schedule = require('node-schedule');
const { spawn } = require("child_process");
const log4js = require('log4js');
log4js.configure({
  appenders:{
    everything: {
      type: 'dateFile', // 文件输出
      filename: 'logs/', // 需要手动创建此文件夹
      pattern: "yyyy-MM-dd.log",
      alwaysIncludePattern: true,
      maxLogSize: 1024,
      backups: 4, // 日志备份数量，大于该数则自动删除
      category: 'logInfo' // 记录器名
    }
  },
  categories: {
    default: { appenders: [ 'everything' ], level: 'info' }
  }
});
const logger = log4js.getLogger();
logger.level = 'info';
function execChunk () {
  const ls = spawn("node", ['./zuidazy/chunk']);
  ls.stdout.on('data', (data) => {
    logger.info(`stdout: zuidazy ${data}`);
  });
  
  ls.stderr.on('data', (data) => {
    logger.error(`stderr: ${data}`);
  });
  
  ls.on('close', (code) => {
    logger.info(`zuidazy 子进程退出码：${code}`);
  });
}

function execChunk2 () {
  const ls = spawn("node", ['./kuyunzy/chunk']);
  ls.stdout.on('data', (data) => {
    logger.info(`stdout: kuyunzy ${data}`);
  });
  
  ls.stderr.on('data', (data) => {
    logger.error(`stderr: ${data}`);
  });
  
  ls.on('close', (code) => {
    logger.info(`kuyunzy 子进程退出码：${code}`);
  });
}
const rule = new schedule.RecurrenceRule();
// 每两小时执行一次
const times = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];
rule.hour = times;
rule.minute = 0;

schedule.scheduleJob(rule, function(){
  execChunk();
  execChunk2();
});