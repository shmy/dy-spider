const mongoose = require('./connect')

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const schema = new Schema({
  id: Number, // 资源id
  thumbnail: String,
  quality: String, // 影片质量
  name: String, // 电影名称
  alias: Array, // 别名
  director: Array, // 导演
  starring: Array, // 主演
  region: String, // 地区
  language: String, // 语言
  released_at: String, // 上映时间
  running_time: Number, // 片长
  generated_at: Date, // 更新时间
  introduce: String, // 影片简介
  href: String, // 抓取链接
  source: String, // 来源
  saved: Boolean, // 是否已经下载完毕
  remote_url: Array, // 远程下载链接
  local_url: Array, // 本地链接(已下载)
  source: String, // 来源网站
  pid: ObjectId, // 分类id
  classify: { type: ObjectId, ref: 'classification' }
});

schema.set('toJSON', { getters: true, virtuals: false });

const videoModel = mongoose.model('video', schema);

module.exports = videoModel;
