'use strict';

const Controller = require('egg').Controller;

class WebController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hi egg'
    await ctx.render('index.html');
  }

  async login() {
    const { ctx } = this;
    await ctx.render('login.html')
  }

  async notfound() {
    const { ctx } = this;
    ctx.body = '找不到页面'
    // await ctx.render('404.html')
  }

  search() {
    const { ctx } = this
    ctx.body = `search: ${ctx.query.name}`
  }
}

module.exports = WebController;