/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  console.log('appInfo----', appInfo)
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1594881935200_6644';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
    // Root directory for template files is absolute path, with default value ${baseDir}/app/view.
    root: [
      path.join(appInfo.baseDir, 'dist'),
    ].join(',')
  };

  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'dist')
  };

  return {
    ...config,
    ...userConfig,
  };
};
