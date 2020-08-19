$(function () {
    //获取用户信息
    getuserInfo();
    //退出功能
    var layer = layui.layer
    $("#btnLogout").on('click', function () {
        // 框架提供的询问框
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地token
            localStorage.removeItem('token')
            // 跳转到登录页面
            location.href = '/login.html'
            // 关闭询问框
            layer.close(index);
        });
    })
})
//封装获取用户信息的函数
function getuserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}
//封装用户头像渲染函数
function renderAvatar(user) {
    //用户昵称
    var name = user.nickname || user.username
    $(".welcome").html('欢迎&nbsp;&nbsp;' + name)
    //用户头像
    if (user.user_pic !== null) {
        //有头像
        $(".layui-nav-img").show().attr('src', user.user_pic)
        $(".user-avatar").hide()
    } else {
        //没头像
        $(".layui-nav-img").hide()
        var text = name[0].toUpperCase()
        $(".user-avatar").show().html(text)
    }
}