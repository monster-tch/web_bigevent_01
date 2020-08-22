$(function () {
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                var str = template('tpl-art-cate', res)
                $('tbody').html(str)
            }
        })
    }

    //显示添加文章类别
    var layer = layui.layer
    var form = layui.form
    $("#btnAddCate").on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#dialog-add").html()
        });
    })

    //提交文章分类添加
    var indexAdd = null
    $("body").on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //添加成功重新渲染页面数据
                initArtCateList()
                layer.msg('恭喜添加文章类别成功!')
                layer.close(indexAdd)
            }
        })
    })

    // 修改展示表单
    var indexEdit = null
    $("tbody").on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $("#dialog-edit").html()
        });
        var Id = $(this).attr('data-id')
        // alert(Id)
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                form.val('form-edit', res.data)
            }

        })
    })

    //提交修改内容
    $("body").on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //添加成功重新渲染页面数据
                initArtCateList()
                layer.msg('恭喜,文章类别更新成功!')
                layer.close(indexEdit)
            }
        })
    })

    //删除文章类别
    $("tbody").on('click', '.btn-delete', function (e) {
        var Id = $(this).attr('data-Id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + Id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    //添加成功重新渲染页面数据
                    initArtCateList()
                    layer.msg('恭喜文章类别删除成功!')
                    layer.close(indexAdd)
                }
            })
            layer.close(index);
        });
    })
})