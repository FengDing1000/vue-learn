const express = require('express');
const db = require('../../dbs/db');
const router = express.Router();
router.get("/home", function(req, res, next) {
    console.log("首页");
    res.json({ code: 'success', message: '首页请求成功!!!' })
})
module.exports = router;