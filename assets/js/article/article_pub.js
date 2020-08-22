$(function () {
    var layer = layui.layer
    var form = layui.form
    initCate()
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类列表数据失败!')
                }
                var str = template('tpl-cate', res)
                // alert(str)
                $('[name=cate_id]').html(str)
                form.render()
            }
        })
    }
    // 初始化富文本编辑器
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    //封面图片
    $("#btnChooseImage").on('click', function () {
        $("#coverFile").click()
    })
    //裁剪封面
    $("#coverFile").on('change', function (e) {
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image.cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    //设置状态
    var state = '已发布'
    $("#btnSave2").on('click', function () {
        state = '草稿'
    })
    //添加文章
    $("#form-pub").on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData(this)
        fd.append('state', state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (file) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', file)
                // console.log(...fd);
                publishArticle(fd)
            })
    })

    //封装添加文章的方法
    function publishArticle(fd) {
        $.ajax({
            method: 'post',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜发布文章成功')
                location.href = '/article/article_list.html'
            }
        })
    }
})