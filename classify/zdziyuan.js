const ObjectId = id => id;

const host = "http://www.zdziyuan.com/inc/s_api_m3u8.php";
const source = "zuidazy";
const getUrl = (id, page) => `${host}?ac=list&t=${id}&pg=${page}`;

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
  const latestTime = getNow();
  return arr.map(item => ({
    url: getUrl(item.id, page),
    parser: 'listParser',
    saver: null,
    source: source,
    pid: item.pid,
    // latestTime: new Date("2016-01-01").getTime(),
    latestTime: latestTime,
  }));
}

function getNow() {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  let day = date.getDate();
  day = day < 10 ? '0' + day : day;
  const toDay = `${year}-${month}-${day}`;
  return new Date(toDay).getTime();
}

module.exports = {
  classify: getClassify(type, 1),
  url: host,
  source: source,
}; // 从第一页开始
