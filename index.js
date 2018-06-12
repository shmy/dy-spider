const Koa = require('koa');
const Cors = require('@koa/cors');
const Router = require('koa-joi-router');
const fs = require('fs')
const SpaRouter = Router();
const ClientApi = Router();
const ServerApi = Router();

const System = require('./routes/system');
const Movie = require('./routes/movie');

function fsExistsSync(path) {
  try{
    fs.accessSync(path, fs.F_OK);
  }catch(e){
    return false;
  }
  return true;
}

SpaRouter.get('/', async (ctx) => {
  ctx.redirect('/client');
});
// 后台
SpaRouter.get('/client*', async (ctx) => {
  ctx.type = 'html';
  let pathinfo = ctx.url.replace(/^\/client/, '');
  pathinfo = `./static${pathinfo}/index.html`;
  pathinfo = fsExistsSync(pathinfo) ? pathinfo : './static/index.html';
  console.log(pathinfo);
  ctx.body = fs.createReadStream(pathinfo);
})
// 静态服务
SpaRouter.get('/static*', require('koa-static')("./static", { }));
// 客户端API接口
ClientApi.use(InjectResponse);
ClientApi.prefix('/api/client');
ClientApi.get('/classification', Movie.classification);
ClientApi.get('/classification/:id', Movie.classificationList);
ClientApi.get('/video/search', Movie.videoSearch);
ClientApi.get('/video/:id', Movie.video);

// 服务端API接口
ServerApi.use(InjectResponse);
ServerApi.prefix('/api/server');
ServerApi.get('/system/info', System.index);
ServerApi.get('/classification', Movie.classification);
ServerApi.get('/classification/:id', Movie.classificationList);


const app = new Koa();

app.use(SpaRouter.middleware());
app.use(Cors());
app.use(ClientApi.middleware());
app.use(ServerApi.middleware());
app.listen(1994);

async function InjectResponse(ctx, next) {
  ctx.success = function (data) {
    return ctx.body = {
      success: true,
      message: 'ok',
      payload: data
    };
  };
  ctx.fail = function (message) {
    return ctx.body = {
      success: false,
      message: message,
      payload: null
    };
  };
  await next();
}