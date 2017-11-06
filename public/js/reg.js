/**
 * 注册ajax请求
 */
/**
 * 点击注册按钮后触发ajax
 */
$name = $("#form").find('input[name="name"]');
$password = $("#form").find('input[name="password"]')
$date = $("#form").find('input[name="date"]');
$phone = $("#form").find('input[name="phone"]');
$email = $("#form").find('input[name="email"]');
$submit = $("#form").find('input[type="submit"]');
$define = $('.define');

$submit.click(function () {
    $.post("/register", {
            'name': $name.val(),
            'password': $password.val(),
            'date': $date.val(),
            'phone': $phone.val(),
            'email': $email.val()
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
            }
        }, "json"
    );
});