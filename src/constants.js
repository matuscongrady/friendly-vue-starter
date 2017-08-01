const { version, name } = require('../package.json');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  APP_NAME: name,
  APP_VERSION: isProd ? version : 'dev',
  DEFAULT_LOCALE: 'en',
  API_ENDPOINT: isProd
    ? 'https://api.graph.cool/simple/v1/insta'
    : 'https://api.graph.cool/simple/v1/insta'
};
