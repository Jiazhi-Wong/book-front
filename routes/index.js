const Router = require('koa-router');
const router = new Router();

const book = require('./book');
const bookApi = require('./api-book');

const apiPrefix = '/api';

router
  .use(book.routes())
  .use(apiPrefix, bookApi.routes())

module.exports = router;
