const log = require('./utils/log');
const Koa = require('koa');
const serve = require('koa-static');
const render = require('koa-swig');
const co = require('co');
const path = require('path');
const config = require('./config');

const app = new Koa();

const host = config.serverHost;
const port = config.serverPort;

async function start() {

  // 前置路由中间件
  require('./middlewares/helper').errorHandler({ app });
  require('./middlewares/helper').logTime({ app });
  require('./middlewares/helper').bodyParser({ app });

  // 接口路由
  require('./middlewares/router').useRouter({ app });

  // 模板渲染
  app.context.render = co.wrap(render({
    root: path.join(__dirname, 'views'),
    ext: 'html',
    cache: false,
  }));

  // 静态资源
  app.use(serve(__dirname + '/public'));

  app.listen(port, host);
  log.info('Server listening on http://' + host + ':' + port);
}

start().catch(err => log.error(err));
