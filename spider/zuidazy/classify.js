const ObjectId = id => id;

const host = 'http://www.zuidazy.com/';
const getUrl = (id, page) => `${host}?m=vod-type-id-${id}-pg-${page}.html`;
const type = [
  { // 动作片
    id: 5,
    pid: ObjectId("5b0fd14e7cad175a34a2ea8a")
  },
  { // 喜剧片
    id: 6,
    pid: ObjectId("5b0fd14e7cad175a34a2ea8b")
  },
  { // 爱情片
    id: 7,
    pid: ObjectId("5b0fd14e7cad175a34a2ea8c")
  },
  {
    // 科幻片
    id: 8,
    pid: ObjectId("5b0fd14e7cad175a34a2ea8d")
  },
  {
    // 恐怖片
    id: 9,
    pid: ObjectId("5b0fd14e7cad175a34a2ea8e")
  },
  {
    // 剧情片
    id: 10,
    pid: ObjectId("5b0fd14e7cad175a34a2ea8f")
  },
  {
    // 战争片
    id: 11,
    pid: ObjectId("5b0fd14e7cad175a34a2ea90")
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

exports.fullClass = getClassify(type, 45);

exports.chunkClass = getClassify(type, 1);
