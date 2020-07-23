'use strict';
const path = require('path')
/* egg-bin prod:  default+prod */
module.exports = appInfo => {
  const userConfig = {
    api: {
      musicApi: 'https://music.aityp.com'
    }
  }
  return userConfig
}