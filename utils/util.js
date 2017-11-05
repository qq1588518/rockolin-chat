const crypto = require("crypto");
/**
 * MD5加密
 */
function md5(mingma) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(mingma).digest('base64');
    return password;
}
module.exports = {
    md5
};