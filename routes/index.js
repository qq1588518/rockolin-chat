var express = require('express');
var router = express.Router();

/* GET请求主页 */
router.get('/', function (req, res, next) {
  res.redirect(302, '/login');
});

module.exports = router;