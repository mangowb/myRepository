$(function () {
    pageChange();
    // getUserInfo();
    changepwd();
    checkcollection();
})

function pageChange() {
    var btn1 = document.querySelector(".shouye");
    var btn2 = document.querySelector(".yimai");
    var btn3 = document.querySelector(".tuihuo");
    var btn4 = document.querySelector(".shoucang");
    var btn5 = document.querySelector(".gaimi");
    var dbtn1 = document.querySelector(".p_shouye");
    var dbtn2 = document.querySelector(".p_yimai");
    var dbtn3 = document.querySelector(".p_tuihuo");
    var dbtn4 = document.querySelector(".p_shoucang");
    var dbtn5 = document.querySelector(".p_gaimi");
    btn1.onclick = function () {
        dbtn1.style.display = "block";
        dbtn2.style.display = "none";
        dbtn3.style.display = "none";
        dbtn4.style.display = "none";
        dbtn5.style.display = "none";
    }
    btn2.onclick = function () {
        dbtn2.style.display = "block";
        dbtn1.style.display = "none";
        dbtn3.style.display = "none";
        dbtn4.style.display = "none";
        dbtn5.style.display = "none";
    }
    btn3.onclick = function () {
        dbtn3.style.display = "block";
        dbtn1.style.display = "none";
        dbtn2.style.display = "none";
        dbtn4.style.display = "none";
        dbtn5.style.display = "none";
    }
    btn4.onclick = function () {
        dbtn4.style.display = "block";
        dbtn1.style.display = "none";
        dbtn2.style.display = "none";
        dbtn3.style.display = "none";
        dbtn5.style.display = "none";
    }
    btn5.onclick = function () {
        dbtn5.style.display = "block";
        dbtn1.style.display = "none";
        dbtn2.style.display = "none";
        dbtn3.style.display = "none";
        dbtn4.style.display = "none";
    }
}
function checkcollection() {
    var dataa = { UserID: getInfo_in_personal() }
    console.log(dataa);
    $.ajax({
        method: 'post',
        url: '/api/checkcollection',
        data: dataa,
        success: function (res) {
            console.log(res.data)
            pushcollectionhtml(res.data)
        }
    });

}
function pushcollectionhtml(data) {
    $(".eye-flex").empty()
    let i = 0;
    for (let i = 0; i < data.length; i++) {

        $('.eye-flex').append('<li class="eye-renderer__item" style="width: 25%;"><div class="collection-item"><div class="product-bg" id="product-bg' + i + '"><span class="pro-delete"></span></div></div></li>')

        $('#product-bg'+i+'').append('<div  class= "pro-img" > <a href="/gongying/7326595/" target=""><img data-v-59e9e5b8="" src="'+data[i].goodspictures+'" class="s-img-default" id="fruit-img"data-src=""lazy="loaded"></a></div>')

        $('#product-bg'+i+'').append('<div ul id = "fruit-text" > <li><span class="rmb">¥ </span><span class="fruit-price">'+data[i].goodsprice+'</span><span class="Jin"> 元/斤</span></li>'+
        '<li><a href="/gongying/7326595/" target=""><span class="fruit-explain">' + data[i].goodsname + '</span></a></li><li><span class="place">' + data[i].deliveryAddress + '</span></li><li id="li-img"><img src="https://image.cnhnb.com/supply/icon/gjqy.png"></li></div>')
    }
}

function getInfo_in_personal() {
    var id = -1;
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers就是请求头配置对象
        headers: {
            authorization: localStorage.getItem('token') || ''
        },
        async: false,
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
                // return 0
            }
            // 传userid
            id = res.data.UserID
        }
    })
    return id;
}

function changepwd() {
    $('#form_pwd').on('submit', function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault();
        // 2. 发起Ajax的POST请求
        var data = { oldPwd: $('#form_pwd [name=password]').val(), newPwd: $('#form_pwd [name=newpassword]').val() }
        console.log(data);
        $.ajax({
            method: 'POST',
            url: '/my/updatePwd',
            // headers就是请求头配置对象
            headers: {
                authorization: localStorage.getItem('token') || ''
            },
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('修改密码失败！')
                    // return 0
                }
                layui.layer.msg('修改密码成功！请重新登录')
                // 跳转到后台主页
                // 1.清空本地存储中的token
                localStorage.removeItem('token')
                // 2.重新跳转到未登录的页面
                location.href = './login.html'
            }
        })
    })
}