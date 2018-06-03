const model = require('../model');
const request = require('request');
const fs = require('fs');
// const progress = require('progress-stream');
const progress = require('request-progress');

exports.index = async (ctx) => {
  ctx.success(
     await model.classificationModel.find({})
  );
};

exports.download = async (ctx) => {
 
  progress(
    request.get({
      uri: 'http://xiazai.jingpingxiazai.com/20180528/BqPkpPsh/mp4/BqPkpPsh.mp4', 
      encoding: null,
      proxy: 'http://127.0.0.1:1087'
    })
  )
  .on('error', error => console.log(error))
  .on('end', () => console.log('end'))
  .on('progress', progress => {
    console.clear();
    console.log('已用时：', progress.time.elapsed);
    console.log('预计用时：', progress.time.remaining);
    console.log('速度：', progress.speed / 1024);
    console.log('进度', progress.percent, progress.size.total, progress.size.transferred);
  })
  .pipe(fs.createWriteStream('doodle.dmg'));

  ctx.success(
     {
      ok: 1
     }
  );
};