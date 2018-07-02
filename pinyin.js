const model = require('./model');
const pinyin = require('pinyin');
console.time(1);
;(async () => {
  const items = await model.videoModel.find({});
  let i = 0;
  for (let item of items) {
    let keyword = item.name;
    keyword += item.alias.join('');
    keyword += item.director.join('');
    keyword += item.starring.join('');
    keyword += pinyin(keyword, {
      style: pinyin.STYLE_NORMAL, // 设置拼音风格
      heteronym: true
    }).map(i => i[0]).join('');
    await model.videoModel.update({ _id: item._id }, { keyword })
    i ++;
    console.log(i, keyword);
  }
  console.timeEnd(1);
})();