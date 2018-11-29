const resolve = require('path').resolve;
const envName = require('../utils/env').name;

module.exports = require(resolve(__dirname, `${envName}.env`));
