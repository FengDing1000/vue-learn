const exp = require("express");
const mongoose = require('mongoose');
const logger = require('morgan'); //日志打印
const session = require('express-session'); //会话---用来保存用户信息
const mongoStore = require('connect-mongo')(session); //将session保存到MongoDB中
const cookieParser = require('cookie-parser');
//因为后台录入页有提交表单的步骤，故加载此模块用来文件解析，将表单里的数据进行格式化
const bodyParser = require('body-parser');
//mongoDB数据库的连接地址
const dbUrl = 'mongodb://127.0.0.1/bookStory';
const app = exp();
// app.locals的各属性值将贯穿程序app的整个生命周期，相当于声明了一个全局变量
app.locals.moment = require('moment');
mongoose.connect(dbUrl);
mongoose.connection.on('connected', () => console.log('bookStory数据库连接成功...'));
//将表单数据提取到req.body中
app.use(bodyParser.urlencoded({ extended: true }));
// 解析json格式数据
app.use(bodyParser.json());
//将cookie数据提取到
app.use(cookieParser("bookStory"));
// 将在mongoDB数据库中创建session集合
app.use(session({
    // name: 设置 cookie 中保存 session id 的字段名称，默认为connect.sid
    // secret: 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    // resave: 如果为true，则每次请求都重新设置sessio的 cookie，假设你的cookie是10分钟过期，每次请求都会再设置10分钟
    // saveUninitialized: 如果为true, 则无论有没有session的cookie，每次请求都设置个session cookie
    secret: 'bookStory',
    name: "connect.sid",
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }, //超时时间
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}));
// 保持会话持久 路由，类似于java中的拦截器功能，在请求到达后台之前，先在这里处理
app.use(function(req, res, next) {
    console.log("拦截", req.body)
    console.log('预处理req.sessionId====', req.sessionID);
    next();
});
// 解决跨域
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200); //让options请求快速返回
    } else {
        next();
    }
});
// 路由配置
require('./routers/router')(app);
//监听 port[8888]端口 
app.listen(8888, () => console.log("8888端口正在运行..."));