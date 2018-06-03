const mongoose = require('./connect')

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const schema = new Schema({
    _id: ObjectId,
    name: String, // 分类名称
    pid: ObjectId, // 父级ID
    href: String, // 链接地址
});

schema.set('toJSON', { getters: true, virtuals: false });

const classificationModel = mongoose.model('classification', schema);

module.exports = classificationModel;