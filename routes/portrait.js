var express = require('express');
var router = express.Router();
var mongo = require('../utils/mongoDb');


/* 用户头像和名字 */
router.post('/portrait', function (req, res, next) {
    var data = [];
    mongo.find('user', {}, (err, result) => {
        for (let i = 0; i < result.length; i++) {
            data.push({
                'name': result[i].name,
                'image': result[i].image
            })
        };
        data = Array.from(new Set(data));
        res.send({
            'start': 1,
            'data': data
        })
    })
});
module.exports = router;