$(function () {
    getUserInfo();
    searchGoods();
    listenDel();
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers就是请求头配置对象
        headers: {
            authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
                // return 0
            }
            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        }
    })
}
var layer = layui.layer
// 渲染用户头像
function renderAvatar(user) {
    // 1.获取用户名称
    var name = user.nickname
    $('.num1').html('<a href="./Personal_Center.html" class="head_item">个人中心</a>')
    $('.num2').html('<a href="" class="head_item userinfo"><span class="text-avatar">A</span>' + name + '</a><dl class="layui-nav-child" style="top: 32px;"><dd><a href="./Personal_Center.html">修改信息</a></dd><dd id="btnLogout"><a href="javascript:;">退出登录</a></dd></dl>')
    $('.card-t').html('<div class="u-c userinfo"><span class="text-avatar"></span><div class="u-c-r"><div class="s1">Hi，' + name + '</div><div class="s2">尽享专属服务</div></div></div>')
    // 2.渲染文本图像
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first)

    // 推出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.清空本地存储中的token
            localStorage.removeItem('token')
            // 2.重新跳转到未登录的页面
            location.href = './homePage.html'
            // 关闭confirm询问框
            layer.close(index);
        });
    })
}

//模糊搜索商品
function searchGoods() {
    flag = false;
    $('.search-ctn').on('compositionstart', function () {
        // 输入汉语拼音时锁住搜索框，不进行搜索，或者从汉语拼音转到字母时也可触发
        flag = true;
    });
    $('.search-ctn').on('compositionend', function () {
        // 结束汉语拼音输入并生成汉字时，解锁搜索框，进行搜索
        flag = false;
        // 接下去放ajax请求生成下拉框内容
        $.ajax({
            method: 'POST',
            url: '/api/searchgoods',
            data: { goodsname: $('.search-ctn').val() },
            // ContentType: "application/json;charset=utf-8;",
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('搜索商品失败！')
                }
                searchbox(res.data);
            }
        })
    });
}
function searchbox(data) {
    $('.hot-cate-list').css('display', 'none')
    $('.search_menu').css('display', 'block');
    $('.search_menu').empty();
    if (data.length > 4) {
        for (var i = 0; i < 4; i++) {
            $('.search_menu').append('<li><a href="./goodsdetail.html?goodsID='+data[i].goodsID+'">' + data[i].goodsname + '</a></li>')
        }
        $('.search_menu').append('<li><a href="">......</a></li>')
    }
    else {
        for (var i = 0; i < data.length; i++) {
            $('.search_menu').append('<li><a href="./goodsdetail.html?goodsID='+data[i].goodsID+'">' + data[i].goodsname + '</a></li>')
        }
    }
}
// 监听搜索框删除按钮
function listenDel() {
    $('.search-ctn').on('keyup', function (event) {
        if (event.which === 8) {
            if ($('.search-ctn').val() === '') {
                $('.hot-cate-list').css('display', 'block')
                $('.search_menu').css('display', 'none');
            } else {
                $.ajax({
                    method: 'POST',
                    url: '/api/searchgoods',
                    data: { goodsname: $('.search-ctn').val() },
                    // ContentType: "application/json;charset=utf-8;",
                    success: function (res) {
                        if (res.status !== 0) {
                            return layui.layer.msg('搜索商品失败！')
                        }
                        searchbox(res.data);
                    }
                })
            }
        }
    })
}
