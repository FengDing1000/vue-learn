var express = require('express');
module.exports = function(app) {
    // 编写主要路由
    // ******************* 首页 start ***********************
    // 首页
    app.use(require('./home/home'));
    // ******************* 首页 end ***********************
    // ******************* 用户 start ***********************
    // 注册
    app.use(require('./user/register'));
    // 登录
    app.use(require('./user/signin'));
    // 注销
    // app.use(require('./user/signout'));
    // ******************* 用户 end ***********************
}