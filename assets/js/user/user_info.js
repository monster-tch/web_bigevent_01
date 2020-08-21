$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 10) {
                return '昵称长度必须在1-10位之间'
            }
        }
    })

    //用户渲染
    initUserInfo()
    console.log(0);
    var layer = layui.layer
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);

                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 成功 后渲染
                form.val('formUserInfo', res.data)
            }
        })
    }
    //表单重置
    $("#btnReset").on('click', function (e) {
        e.preventDefault();
        //用户信息重新渲染
        initUserInfo()
    })
    //修改用户信息
    $(".layui-form").on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜修改用户信息成功')
                //调用父框架的全局方法
                window.parent.getuserInfo()
            }
        })
    })
})