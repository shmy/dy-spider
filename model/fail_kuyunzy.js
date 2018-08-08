const mongoose = require('./connect')

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const schema = new Schema({
  url: String,
  parser: String, // 解析器
  saver: String, // 保存器
  pid: String, // pid
});

schema.set('toJSON', { getters: true, virtuals: false });

const failModel = mongoose.model('fail_kuyunzy', schema);

module.exports = failModel;
