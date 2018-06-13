const model = require('../model');

exports.classification = async (ctx) => {
  // 获取所有分类
  try {
    ctx.success(
      await model.classificationModel.find({})
   );
  } catch (error) {
    ctx.fail(error.message);
  }
  
};

exports.classificationList = async (ctx) => {
  const id = ctx.params.id;
  let page = ctx.query.page;
  let per_page = ctx.query.per_page;
  page = isNaN(page) ? 1 : +page;
  per_page = isNaN(per_page) ? 20 : +per_page;
  try {
    let ids;
    const classify = await model.classificationModel.findById(id);
    if (classify.pid === null) {
      // 属于
      ids = await model.classificationModel.find({
        pid: classify._id
      });
      ids = ids.map(item => item._id);
      // 如果没有子集
      // 那还是找自己
      if (!ids.length) {
        ids = [id];
      }
    } else {
      ids = [id];
    }
    const conditions = {
      pid: { $in: ids }
    };
    const total = await model.videoModel.count(conditions);
    const result = await model.videoModel.find(conditions, "classify quality name thumbnail generated_at running_time saved")
    .sort({ generated_at: -1 })
    .skip((page - 1) * per_page)
    .limit(per_page);
    ctx.success({
      total,
      page: page,
      per_page: per_page,
      last_page: Math.ceil(total / per_page),
      title: classify.name,
      result
    });
  } catch (error) {
    ctx.fail(error.message);
  }
  
};

exports.video = async (ctx) => {
  const id = ctx.params.id;
  try {
    const result = await model.videoModel.findById(id).populate('classify');
    result !== null ? ctx.success(result) : ctx.fail("资源不存在");
  } catch (error) {
    ctx.fail(error.message);
  }
};

exports.videoSearch = async (ctx) => {
  const keyword = ctx.query.keyword;
  let page = ctx.query.page;
  let per_page = ctx.query.per_page;
  page = isNaN(page) ? 1 : +page;
  per_page = isNaN(per_page) ? 20 : +per_page;
  try {
    const conditions = { name: new RegExp(keyword, "ig") };
    const total = await model.videoModel.count(conditions);
    const result = await model.videoModel.find(conditions, "quality name thumbnail generated_at running_time saved")
      .sort({ generated_at: -1 })
      .skip((page - 1) * per_page)
      .limit(per_page);
    ctx.success({
      total,
      page: page,
      per_page: per_page,
      last_page: Math.ceil(total / per_page),
      result
    });
  } catch (error) {
    ctx.fail(error.message);
  }
}