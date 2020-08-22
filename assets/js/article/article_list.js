$(function () {
    // 定义提交参数
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    initTable()

    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                var str = template('tpl-table', res)
                $('tbody').html(str)
                //分页
                renderPage(res.total)
            }
        })
    }
    //定义美化时间的过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr)

        var y = dt.getFullYear()
        var m = dt.getMonth()
        var d = dt.getDate()
        var hh = dt.getHours()
        var mm = dt.getMinutes()
        var ss = dt.getSeconds()

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss

        //定义补零函数
        function padZero(n) {
            return n > 9 ? n : '0' + n
        }
    }
    var form = layui.form
    initCate()
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                // if (res.status !== 0) {
                //     return layer.msg('获取分类列表数据失败!')
                // }
                var str = template('tpl-cate', res)
                // alert(str)
                $('[name=cate_id]').html(str)
                form.render()
            }
        })
    }
    $("#form-search").on('submit', function (e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })
    //分页
    var laypage = layui.laypage
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total,//数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                console.log();
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        });
    }
    //删除
    var layer = layui.layer
    $("tbody").on('click', '.btn-delete', function (e) {
        var Id = $(this).attr('data-Id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + Id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    //添加成功重新渲染页面数据
                    layer.msg('恭喜文章类别删除成功!')
                    if ($(".btn-delete").length == 1 && q.pagenum > 1) q.pagenum--
                    initTable()
                }
            })
            layer.close(index);
        });
    })
    // $("tbody").on("click", ".btn-delete", function (e) {
    //     var Id = $(this).attr("data-Id")
    //     layer.confirm('是否确定删除?', { icon: 3, title: '提示' }, function (index) {
    //         //do something
    //         $.ajax({
    //             method: 'get',
    //             url: '/my/article/delete/' + Id,
    //             success: function (res) {
    //                 if (res.status !== 0) {
    //                     return layer.msg(res.message)
    //                 }
    //                 initTable()
    //                 layer.msg('恭喜您文章删除成功')
    //             }
    //         })
    //         layer.close(index);
    //     });
    // })
})