import FetchButton from './FetchButton.js';

const querySelector = document.querySelector.bind(document);

new FetchButton({
  element: querySelector('#save-btn'),
  setBody() {
    let body = new URLSearchParams();

    body.append('Book[book_name]', querySelector('#book-name').value)
    body.append('Book[book_author]', querySelector('#book-author').value)
    body.append('Book[book_desc]', querySelector('#book-desc').value)

    return body;
  },
  resolveCb(res) {
    res.json().then(({code, msg, data}) => {
      if (code === 0) {
        history.back();
      } else {
        alert(msg);
      }
    })
  },
  rejectCb(res) {
    alert(res)
  }
})