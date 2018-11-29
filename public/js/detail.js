import FetchButton from './FetchButton.js';

document.querySelectorAll('.del-btn').forEach(element => {
  new FetchButton({
    element,
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
})
