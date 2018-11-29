class FetchButton {
  constructor({element, setBody, resolveCb, rejectCb}) {
    if (!(element instanceof HTMLElement)) {
      return console.error('传入HTMLElement')
    }

    let dataset = element.dataset;

    this.element = element;

    this.url = dataset.url;
    this.method = dataset.method || 'GET';
    this.confirm = dataset.confirm;

    this.setBody = setBody;
    this.resolveCb = resolveCb;
    this.rejectCb = rejectCb;

    this.bindClick();
  }

  bindClick() {
    this.element.addEventListener('click', (e) => {
      e.preventDefault();

      // 有confirm 并且为false，返回不执行操作
      if (this.confirm && !window.confirm(this.confirm)) return;

      this.fetch();
    })
  }

  fetch() {
    let option = {
      method: this.method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    if (!['get', 'head'].includes(this.method.toLowerCase()) && (typeof this.setBody === 'function')) {
      option.body = this.setBody();
    }

    fetch(this.url, option).then((response) => {
      return this.resolveCb(response);
    }).catch((err) => {
      return this.rejectCb(err);
    });
  }
}

export default FetchButton;