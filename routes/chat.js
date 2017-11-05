var express = require('express');
var router = express.Router();

/* 聊天室 */
router.get('/chat', function (req, res, next) {
    if (req.session.login != 1) {
        res.redirect(302, '/login');
    } else {
        res.render('chat');
    }
});

module.exports = router;