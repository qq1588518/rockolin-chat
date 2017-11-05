var express = require('express');
var router = express.Router();
const util = require("../utils/util");
var mongo = require('../utils/mongoDb');

/* GET请求login */
router.get('/login', function (req, res, next) {
    res.render('login');
});
/* POST请求login */
router.post('/login', function (req, res, next) {
    const name = req.body.name;
    let password = req.body.password;
    // 解密
    password = util.md5(password);

    //根据用户填写的姓名，去数据库里面找这个文档，读取密码。
    //如果读取的密码，和填写的密码一样，登陆成功了；
    //如果读取的密码，和填写的密码不一样，登陆失败
    //如果根本没有找到这个记录，那么就说明用户名填写错了
    mongo.find("user", {
        "name": name
    }, function (err, result) {
        if (result.length == 0) {
            res.send({
                'result': -1 // -1表示没有用户没有注册
            });
            return;
        }
        const passwords = result[0].password;
        if (passwords === password) {
            req.session.login = "1";
            req.session.name = name;
            res.send({
                'result': 1 // 登入成功
            });
            return;
        } else {
            res.send({
                'result': 0 // 0表示密码错误
            });
            return;
        }
    });
});
module.exports = router;