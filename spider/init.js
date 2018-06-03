const model = require('../model');

const classifications = [{
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
    ]
}];;
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