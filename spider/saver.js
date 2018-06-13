const model = require('../model');
let count = 0;
exports.detailSaver = async payload => {
  // console.log(payload);
  // return Promise.resolve();
  if (!payload.name) {
    return Promise.resolve();
  }
  const p = await model.videoModel.findOne({ id: payload.id, source: payload.source });
  count ++;
  console.log("#", count);
  if (!p) {
    console.log('👌开始保存---', "{" + payload.name + "}", payload.id);
    return model.videoModel.create(payload);
  }
  console.log( '😯开始更新---', "{" + payload.name + "}", payload.id);
  return model.videoModel.update({ id: payload.id }, payload);
};