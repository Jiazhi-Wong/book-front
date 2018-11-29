const router = require('../routes');

module.exports = {
  useRouter ({ app }) {
    app
      .use(router.routes())
      .use(router.allowedMethods());
  },
}
