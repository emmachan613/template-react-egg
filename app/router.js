'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { index, login } = controller.web.index;
  const { list } = controller.api.demo;

  // web
  router.get('/', index)
  router.get('/login', login)

  //api
  router.get('/api/demo/list', list)
};
