const model = require('../model');

const classifications = [
  {
    parent: {
      _id: "5b1362ab30763a214430d036",
      name: "电影",
      pid: null,
    },
    children: [
      { name: "动作片", _id: "5b0fd14e7cad175a34a2ea8a" },
      { name: "喜剧片", _id: "5b0fd14e7cad175a34a2ea8b" },
      { name: "爱情片", _id: "5b0fd14e7cad175a34a2ea8c" },
      { name: "科幻片", _id: "5b0fd14e7cad175a34a2ea8d" },
      { name: "恐怖片", _id: "5b0fd14e7cad175a34a2ea8e" },
      { name: "剧情片", _id: "5b0fd14e7cad175a34a2ea8f" },
      { name: "战争片", _id: "5b0fd14e7cad175a34a2ea90" },
      { name: "记录片", _id: "5b6bd4eb50456c5fb99610f4" },
      { name: "伦理片", _id: "5b6bd55a50456c5fb99610f5" },
      { name: "福利片", _id: "5b6c1f84adcfce70593225a9" },
    ]
  },
  {
    parent: {
      _id: "5b1fce6330025ae5371a6a8a",
      name: "连续剧",
      pid: null,
    },
    children: [
      { name: "国产剧", _id: "5b1fcf0b30025ae5371a6ad8" },
      { name: "港台剧", _id: "5b1fcf6330025ae5371a6b00" },
      { name: "日韩剧", _id: "5b1fcfb230025ae5371a6b22" },
      { name: "欧美剧", _id: "5b1fcffb30025ae5371a6b41" },
    ]
  },
  {
    parent: {
      _id: "5b1fd85730025ae5371abaed",
      name: "综艺",
      pid: null,
    },
  },
  {
    parent: {
      _id: "5b1fdbee30025ae5371ac363",
      name: "动漫",
      pid: null,
    },
  }
];
(async() => {
    await model.classificationModel.deleteMany({});
    for (let classification of classifications) {
        let ret = await model.classificationModel.create(classification.parent);
        classification.children.forEach(i => i.pid = ret._id);
        ret = await model.classificationModel.create(classification.children);
        console.log(ret);
        process.exit(0);
    }
})();