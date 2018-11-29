// 这里是调用后端api服务
const request = require('request');

const serverUrl = 'http://yd.com/yd-yii/web/index.php';

const requestApi = request.defaults({
  baseUrl: serverUrl,
  json: true
});

function requestHandler(resolve, reject) {
  return function (error, response, body) {
    if (error || response.statusCode !== 200) {
      return resolve({
        code: -1,
        msg: error ? error.message : `statusCode: ${response.statusCode}`,
        data: {}
      });
    }

    resolve(body);
  }
}

module.exports = {
  getBookList() {
    return new Promise((resolve, reject) => {
      requestApi.get('?r=book&book_name=123', requestHandler(resolve, reject));
    })
  },

  getBook(bookId) {
    return new Promise((resolve, reject) => {
      requestApi.get(`?r=book/view&id=${bookId}`, requestHandler(resolve, reject));
    })
  },

  createBook(body) {
    return new Promise((resolve, reject) => {
      requestApi.post({url: `?r=book/create`, form: body}, requestHandler(resolve, reject));
    })
  },

  updateBook(bookId, body) {
    return new Promise((resolve, reject) => {
      requestApi.post({url: `?r=book/update&id=${bookId}`, form: body}, requestHandler(resolve, reject));
    })
  },

  delBook(bookId) {
    return new Promise((resolve, reject) => {
      requestApi.post(`?r=book/delete&id=${bookId}`, requestHandler(resolve, reject));
    })
  },
}