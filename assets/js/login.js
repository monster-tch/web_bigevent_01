$(function () {
    $("#link-reg").on('click', function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#link-login").on('click', function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })
    // 自定义验证规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,
            "密码必须6 - 16位, 且不能输入空格"
        ],
        repwd: function (value) {
            var pwd = $('.reg-box input[name=password]').val();
            if (value !== pwd) {
                return '两次密码输入不一致'
            }
        }
    })
    //注册功能
    $("#form_reg").on('submit', function (e) {
        //阻止表单默认提交
        e.preventDefault();
        //发送Ajax
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val()
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请登录!')
                //手动设置单击事件
                $("#link-login").click();
                //重置form表单
                $("#form_reg")[0].reset();
            }
        })
    })
    //登录
    $("#form_login").submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 1.提示信息 2.保存token 3.跳转页面
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})