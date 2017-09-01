const express = require('express');
const db = require('../../dbs/db');
const router = express.Router();
// 注册
router.get("/api/user/register", (req, res) => {
    let user = req.body;
    console.log('提交的用户信息', user);
    // 保存用户信息
    db.User.findOne({ account: user.account }).exec((err, userModel) => {
        if (err) {
            console.log(err)
        }
        if (userModel) {
            res.json({ code: 'accountExists', message: '该用户名已被占用！！!' })
        } else {
            res.json({ code: 'success', message: '用户名可以使用！！！' })
        }
    })
})
router.post("/api/user/register", (req, res) => {
    let user = req.body;
    console.log('提交的用户信息', user);
    // 保存用户信息
    new db.User(user).save().then(() => {
            res.json({ code: 'success', message: '注册成功！！！' })
        })
        .catch(err => {
            if (db.isDuplicateIndexError(err)) {
                res.json({ code: 'accountExists', message: '该用户名已被占用！！!' })
            } else {
                console.error('保存 用户信息 错误：', err)
                res.json({ code: 'error', message: '服务端错误，请稍后再试！' })
            }
        })
})
module.exports = router;