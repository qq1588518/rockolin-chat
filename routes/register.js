const express = require('express');
const router = express.Router();
const util = require("../utils/util");
var mongo = require('../utils/mongoDb');
const sd = require('silly-datetime');
/**
 * 登入页
 */
router.get('/register', function (req, res, next) {
  res.render("register");
});

/**
 * 处理注册信息
 */
router.post('/register', function (req, res, next) {
  // 取出表单数据
  let id = 1;
  let name = req.body.name;
  let password = req.body.password;
  // 要是想要密码不被破解，建议加密多次。
  //比如：password = util.md5(util.md5(password).split(" ") + util.md5(password));
  password = util.md5(password);
  let date = req.body.date;
  let phone = req.body.phone;
  let email = req.body.email;
  // 获取当前时间
  let time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  // 1到310的随机数
  let random = Math.floor(Math.random() * (309) + 1);
  // 用户头像
  let images = '/images/' + random + '.jpg';
  let data = {
    'id': id,
    'name': name,
    'password': password,
    'image': images,
    'created_time': time,
    'phone': phone,
    'birthday': date,
    'email': email
  };
  mongo.insert('user', data, (err, result) => {
    if (err) {
      res.send({
        'result': -1
      });
      return;
    } else {
      res.send({
        'result': 1
      });
      return;
    }
  })
});

module.exports = router;