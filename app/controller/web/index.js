'use strict';

const Controller = require('egg').Controller;

class WebController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('index.html');
  }

  async login() {
    const { ctx } = this;
    await ctx.render('login.html')
  }

  notfound() {
    const { ctx } = this;
    ctx.body = '找不到页面'
  }
}

module.exports = WebController;