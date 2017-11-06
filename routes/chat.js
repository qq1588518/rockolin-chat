var express = require('express');
var router = express.Router();
const sd = require('silly-datetime');
var mongo = require('../utils/mongoDb');

/* 聊天室 */
router.get('/chat', function (req, res, next) {
    // 获取用户登入时间
    let time = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    if (req.session.login != 1) {
        res.redirect(302, '/login');
    } else {
        res.render('chat', {
            'name': req.session.name,
            'time': time
        });
    }
});
/**
 * 接收用户发过来的说说
 */
router.post('/chat', function (req, res, next) {
    /**
     * 将数据保存到数据库中
     */
    var user = req.body.name;
    var text = req.body.text;
    mongo.insert("content", {
        "name": user,
        'text': text
    }, (err, data) => {
        if (err) {
            res.send({
                result: -1
            })
        } else {
            res.send({
                result: 1
            })
        }
    })
});

module.exports = router;