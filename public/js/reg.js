/**
 * 注册ajax请求
 */
$name = $("#form").find('input[name="name"]');
$password = $("#form").find('input[name="password"]')
$date = $("#form").find('input[name="date"]');
$phone = $("#form").find('input[name="phone"]');
$qq = $("#form").find('input[name="qq"]');
$email = $("#form").find('input[name="email"]');
$submit = $("#form").find('input[type="submit"]');

/**
 * 点击注册按钮后触发ajax
 */
$submit.click(function () {
    if ($name.val() == '' || $password.val() == '' || $date.val() == '' || $phone.val() == '' || $email.val() == '' || $qq.val() == '') {
        layer.alert('表单不能为空', {
            icon: 6,
            skin: 'layer-ext-moon'
        });
    } else {
        $.post("/register", {
                'name': $name.val(),
                'password': $password.val(),
                'date': $date.val(),
                'phone': $phone.val(),
                'email': $email.val(),
                'qq': $qq.val()
            },
            function (data) {
                if (data.result === 1) {
                    layer.alert('注册成功', {
                        icon: 1,
                        skin: 'layer-ext-moon'
                    }, function () {
                        window.location = "/login";
                    });
                } else if (data.result === -1) {
                    layer.alert('注册失败', {
                        icon: 2,
                        skin: 'layer-ext-moon'
                    });
                } else if (data.result === 3) {
                    layer.alert('用户名已经存在', {
                        icon: 2,
                        skin: 'layer-ext-moon'
                    });
                }
            }, "json"
        );
    }
});