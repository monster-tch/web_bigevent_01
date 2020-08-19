//开发环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net'
//测试环境服务器地址
// var baseURL = 'http://ajax.frontend.itheima.net'
//生产环境服务器地址
// var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (res) {
    res.url = baseURL + res.url

    //统一为有权限的接口,设置header头信息
    if (res.url.indexOf('/my/') !== -1) {
        res.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 拦截所有相应 判断身份认证信息
    res.complete = function (eve) {
        console.log(eve.responseJSON);
        var obj = eve.responseJSON
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})