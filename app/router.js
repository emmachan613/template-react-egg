'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { index, login, notfound } = controller.web.index;
  // const { index, login } = controller.home

  router.get('/', index)
  router.get('/login', login)
  // web
  // app.redirect('/', '/act', 302);
  // router.get('/act', index)
  // router.get('/mng', mng)
  // // use middleware
  // router.get('/search', app.middleware.uppercase(), search)

  router.all('*', notfound)
  // router.get('/', controller.home.index);
  // router.get('/test', controller.test.index)
};
