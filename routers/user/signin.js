const express = require('express');
const db = require('../../dbs/db');
const router = express.Router();
// 登录验证
router.post("/api/user/signin", (req, res) => {
    console.log('提交的用户信息', req.body);
    let user = req.body;
    db.User.findOne({ account: user.account }).exec((err, userModel) => {
        if (err) {
            console.log(err);
        }
        if (!userModel) {
            res.json({ code: "accountError", message: "用户名不存在，，请先注册！！！" });
            return;
        }
        userModel.comparePassword(user.password, (err, isMatch) => {
            if (err) {
                console.log(err);
            }
            if (!isMatch) {
                res.json({ code: 'passwordError', message: "密码输入错误！！！" });
            } else {
                console.log("密码匹配成功！！！");
                db.User.update({ _id: userModel._id }, {
                    $set: { rememberPassword: user.rememberPassword }
                }, function(err) {
                    if (err) {
                        console.log(err);
                    }
                    req.session.user = userModel; //存储会话的用户信息 会存放在数据库中 
                    let userInfo = db.toData(userModel);
                    res.json({
                        code: 'success',
                        message: '登录成功！！！',
                        user: {
                            id: userInfo.id,
                            account: userInfo.account
                        }
                    })
                })
            }
        })
    })
})
module.exports = router;