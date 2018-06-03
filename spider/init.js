const model = require('../model');

const classifications = [
  {
    parent: {
      name: "电影",
      pid: null,
    },
    children: [
      { name: "动作片",  },
      { name: "喜剧片",  },
      { name: "爱情片",  },
      { name: "科幻片",  },
      { name: "恐怖片",  },
      { name: "剧情片",  },
      { name: "战争片",  },
    ]
  }
];
;(async () => {
  await model.classificationModel.deleteMany({});
  for (let classification of classifications) {
    let ret = await model.classificationModel.create(classification.parent);
    classification.children.forEach(i => i.pid = ret._id);
    ret = await model.classificationModel.create(classification.children);
    console.log(ret);
    process.exit(0);
  }
})();