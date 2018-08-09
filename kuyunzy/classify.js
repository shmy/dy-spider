const ObjectId = id => id;

const host = 'http://www.kuyunzy.net/';
const getUrl = (id, page) => `${host}list/?${id}-${page}.html`;
const type = [
  {
    // 记录片
    id: 42,
    pid: ObjectId("5b6bd4eb50456c5fb99610f4")
  },
];
const type2 = [
  { // 动作片
    id: 32,
    pid: ObjectId("5b0fd14e7cad175a34a2ea8a")
  },
  { // 喜剧片
    id: 33,
    pid: ObjectId("5b0fd14e7cad175a34a2ea8b")
  },
  { // 爱情片
    id: 34,
    pid: ObjectId("5b0fd14e7cad175a34a2ea8c")
  },
  {
    // 科幻片
    id: 35,
    pid: ObjectId("5b0fd14e7cad175a34a2ea8d")
  },
  {
    // 恐怖片
    id: 36,
    pid: ObjectId("5b0fd14e7cad175a34a2ea8e")
  },
  {
    // 剧情片
    id: 37,
    pid: ObjectId("5b0fd14e7cad175a34a2ea8f")
  },
  {
    // 战争片
    id: 38,
    pid: ObjectId("5b0fd14e7cad175a34a2ea90")
  },
  {
    // 记录片
    id: 42,
    pid: ObjectId("5b6bd4eb50456c5fb99610f4")
  },
  
  {
    // 国产剧
    id: 1,
    pid: ObjectId("5b1fcf0b30025ae5371a6ad8")
  },
  {
    // 港台剧 - 香港剧
    id: 2,
    pid: ObjectId("5b1fcf6330025ae5371a6b00")
  },
  {
    // 港台剧 - 台湾剧
    id: 3,
    pid: ObjectId("5b1fcf6330025ae5371a6b00")
  },
  {
    // 日韩剧 - 日本剧
    id: 4,
    pid: ObjectId("5b1fcfb230025ae5371a6b22")
  },
  {
    // 日韩剧 - 韩国剧
    id: 5,
    pid: ObjectId("5b1fcfb230025ae5371a6b22")
  },
  {
    // 欧美剧
    id: 6,
    pid: ObjectId("5b1fcffb30025ae5371a6b41")
  },
  {
    // 欧美剧 海外剧
    id: 29,
    pid: ObjectId("5b1fcffb30025ae5371a6b41")
  },
  {
    // 综艺
    id: 30,
    pid: ObjectId("5b1fd85730025ae5371abaed")
  },
  {
    // 动漫
    id: 31,
    pid: ObjectId("5b1fdbee30025ae5371ac363")
  }
];
function getClassify (arr, page = 100) {
  return arr.map(item => ({
    url: getUrl(item.id, page),
    parser: 'listParser',
    saver: null,
    pid: item.pid
  }));
}

exports.fullClass = getClassify(type, 6); // 从第33页开始

exports.chunkClass = getClassify(type, 1); // 从第一页开始
