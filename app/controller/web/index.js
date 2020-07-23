'use strict';

const Controller = require('egg').Controller;

class WebController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi egg'
    // await ctx.render('page/act.html');
  }

  async mng() {
    const { ctx } = this;
    await ctx.render('page/mng.html')
  }

  async notfound() {
    const { ctx } = this;
    await ctx.render('page/404.html')
  }

  search() {
    const { ctx } = this
    ctx.body = `search: ${ctx.query.name}`
  }
}

module.exports = WebController;