const router = require('koa-router')();
const book = require('../controllers/book');

router
  .get('/books', book.renderBookList)
  .get('/books/detail/:id', book.renderBookDetail)
  .get('/books/create', book.renderBookCreate)
  .get('/books/update/:id', book.renderBookUpdate)

module.exports = router;
