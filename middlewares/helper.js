const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const log = require('../utils/log');

module.exports = {
  errorHandler ({ app }) {
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        log.error(err);
        const status = err.statusCode || err.status || 500;

        ctx.response.status = status;
        ctx.response.body = {
          code: status,
          msg: err.message || 'Internal Server Error'
        };
      }
    });
  },

  logTime ({ app }) {
    app.use(async (ctx, next) => {
      const start = new Date();
      await next();
      const ms = new Date() - start;
      log.info(`${ctx.method} ${decodeURIComponent(ctx.url)} - ${ms}ms`);
    });
  },

  bodyParser ({ app }) {
    app.use(bodyParser());
  },

  cors ({ app }) {
    app.use(cors());
  }
}
