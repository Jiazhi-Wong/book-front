const bookCode = require('../config/code').book;
const bookService = require('../services/book');

module.exports = {
  async renderBookList(ctx) {
    let {data: {list}} = await bookService.getBookList()

    await ctx.render('index', {
      pageTitle: '图书列表',
      list
    });
  },

  async renderBookDetail(ctx) {
    let {data: book} = await bookService.getBook(ctx.params.id);

    await ctx.render('detail', {
      pageTitle: '图书详情',
      book
    });
  },

  async renderBookCreate(ctx) {
    await ctx.render('create', {
      pageTitle: '新建图书',
    });
  },

  async renderBookUpdate(ctx) {
    let {data: book} = await bookService.getBook(ctx.params.id);

    await ctx.render('update', {
      pageTitle: '更新图书',
      book
    });
  },

  /**
   * 获取书籍列表
   */
  async getBookList(ctx) {
    ctx.body = await bookService.getBookList();
  },

  /**
   * 获取某个书籍
   */
  async getBookById(ctx) {
    ctx.body = await bookService.getBook(ctx.params.id);
  },

  /**
   * 创建一个新书籍
   */
  async createBook(ctx) {
    ctx.body = await bookService.createBook(ctx.request.body);
  },

  /**
   * 更新一个书籍
   */
  async updateBookById(ctx) {
    ctx.body = await bookService.updateBook(ctx.params.id, ctx.request.body);
  },

  /**
   * 删除一个书籍
   */
  async deleteBookById(ctx) {
    ctx.body = await bookService.delBook(ctx.params.id);
  },

}
