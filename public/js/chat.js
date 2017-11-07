/**
 * 用户发消息
 */
var socket = io();
var $text = $(".text");
var $button = $(".button");
var $list = $(".list");
var $username = $(".username");
var $userList = $(".user-list");
var User = [];
var allUser = [];
$username = $.trim($username.html());
$button.on("click", function () {
    socket.emit("speak", $text.val());
    /**
     * 提交数据给后台保存
     */
    $.post("/chat", {
            'name': $username,
            'text': $text.val()
        },
        function (data, textStatus, jqXHR) {},
        "json"
    );
    var text = hex_md5($text.val());
    console.log(text);
    $.post("http://www.tuling123.com/openapi/api", {
            'key': 'fb6b7bcfbe52fccdb7f5d752a3088f75',
            'info': $text.val(),
            'userid': '123456'
        },
        function (data, textStatus, jqXHR) {
            socket.emit("req", data.text);
            $.post("/chat", {
                    'name': '小白',
                    'text': data.text
                },
                function (data, textStatus, jqXHR) {},
                "json"
            );
        },
        "json"
    );
    $text.val("");
});
$text.on('keyup', function (ev) {
    var keyCode = ev.which;
    if (keyCode === 13) {
        $button.trigger("click");
    }
});
/**
 * 显示用户输入的内容
 */
socket.on("answer", function (msg) {
    var $li = $('<li class="item">' + '用户' + ':' + msg + '</li>');
    $list.append($li);
});
/**
 * 接收小白说的话
 */
socket.on("xiaobai", function (msg) {
    var $li = $('<li class="item">' + '小白' + ':' + msg + '</li>');
    $list.append($li);
});
socket.emit("name", $username);
/**
 *  得到了所有的用户名字
 */
socket.on("alluser", function (msg) {
    User = msg;
});
$.post("/portrait", {},
    function (data, textStatus, jqXHR) {
        if (data.start === 1) {
            //$userList
            allUser = data.data;
            for (var i = 0; i < allUser.length; i++) {
                var html = '<li class="item clearfix"><div class="ico"><img src="' + allUser[i].image + '" /></div><div class="name">' + allUser[i].name + '</div>';
                $userList.append(html);
            };
        }
    },
    "json"
);