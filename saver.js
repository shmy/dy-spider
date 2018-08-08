const model = require('./model');
const pinyin = require('pinyin');
let count = 0;
exports.detailSaver = async payload => {
  if (!payload.name) {
    return Promise.resolve();
  }
  let keyword = payload.name;
  keyword += payload.alias.join('');
  keyword += payload.director.join('');
  keyword += payload.starring.join('');
  let normal = pinyin(keyword, {
    style: pinyin.STYLE_NORMAL, // 全屏
    heteronym: true
  }).map(i => i[0]).join('');
  let firstLetter = pinyin(keyword, {
    style: pinyin.STYLE_FIRST_LETTER, // 首字母
    heteronym: true
  }).map(i => i[0]).join('');
  
  payload.keyword = keyword + normal + firstLetter;
  // console.log(payload);
  // return Promise.resolve();
  const p = await model.videoModel.findOne({ id: payload.id, source: payload.source });
  if (!p) {
    payload.number = 0;
    count ++;
    console.log('👌开始保存---#', count, "{" + payload.keyword + "}", payload.id);
    return model.videoModel.create(payload);
  }
  // console.log( '😯开始更新---', "{" + payload.name + "}", payload.id);
  return model.videoModel.update({ id: payload.id }, payload);
};