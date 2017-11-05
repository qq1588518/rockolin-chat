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
        function (result) {
            console.log(result);
        }, "json"
    );
});