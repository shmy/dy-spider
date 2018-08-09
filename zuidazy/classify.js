const ObjectId = id => id;

const host = 'http://www.zuidazy.net/';
const getUrl = (id, page) => `${host}?m=vod-type-id-${id}-pg-${page}.html`;
const type = [
  {
    // 福利片
    id: 16,
    pid: ObjectId("5b6c1f84adcfce70593225a9")
  },
]
const type2 = [
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
  },
  {
    // 伦理片
    id: 17,
    pid: ObjectId("5b6bd55a50456c5fb99610f5")
  },
  {
    // 福利片
    id: 16,
    pid: ObjectId("5b6c1f84adcfce70593225a9")
  },
  
  {
    // 国产剧
    id: 12,
    pid: ObjectId("5b1fcf0b30025ae5371a6ad8")
  },
  {
    // 港台剧
    id: 13,
    pid: ObjectId("5b1fcf6330025ae5371a6b00")
  },
  {
    // 日韩剧
    id: 14,
    pid: ObjectId("5b1fcfb230025ae5371a6b22")
  },
  {
    // 欧美剧
    id: 15,
    pid: ObjectId("5b1fcffb30025ae5371a6b41")
  },
  
  {
    // 综艺
    id: 3,
    pid: ObjectId("5b1fd85730025ae5371abaed")
  },
  
  {
    // 动漫
    id: 4,
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

exports.fullClass = getClassify(type, 81); // 从第14页开始

exports.chunkClass = getClassify(type, 1); // 从第一页开始
