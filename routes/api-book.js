const router = require('koa-router')();
const book = require('../controllers/book');

router
  .get('/books', book.getBookList)
  .get('/books/:id', book.getBookById)
  .post('/books', book.createBook)
  .put('/books/:id', book.updateBookById)
  .del('/books/:id', book.deleteBookById)

module.exports = router;
