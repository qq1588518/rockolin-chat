/**
 * ajax登入
 */
var $name = $("form").find("input[name='name']");
var $password = $("form").find("input[name='password']");
var $submit = $("form").find("input[type='submit']");
$submit.on('click', function () {
    $.post("/login", {
            'name': $name.val(),
            'password': $password.val()
        },
        function (data, textStatus, jqXHR) {
            var result = data.result;
            if (result === -1) {
                layer.alert('用户名不存在', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
            } else if (result === 0) {
                layer.alert('密码错误', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
            } else if (result === 1) {
                layer.alert('登入成功', {
                    icon: 1,
                    skin: 'layer-ext-moon'
                }, function () {
                    window.location = "/chat";
                });
            }
        },
        "json"
    );
});