$(function () {
  tablechange();
  getgoods();
  date();
  check();
})
function tablechange() {
  var lis = document.querySelectorAll(".list>ul>li")
  var show = document.querySelectorAll("#listCon>div")
  for (let i = 0; i < lis.length; i++) {
    lis[i].onclick = function () {
      for (var j = 0; j < lis.length; j++) {
        lis[j].className = ''
        show[j].style.display = 'none';
        lis[j].style.background = '#fff'
      }
      this.className = 'active'
      show[i].style.display = 'block'
      lis[i].style.background = '#39bf3e'
    }
  }
}
function getgoods() {
  $.ajax({
    method: 'GET',
    url: '/api/goods',
    dataType: "json",
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取商品失败！')
      }
      goodsdetail(res.data);
      goodsdetailnum1(res.data);
    }
  })
}

function goodsdetail(data) {
  for (let i = 0; i < data.length; i++) {
    $('.goods' + i).children('img').replaceWith('<img src="' + data[i].goodspictures + '" alt="">');
    $('.goods' + i).find('.title').html(data[i].goodsIntroduction);
    $('.goods' + i).find('.sp1').html(data[i].goodsprice);
    $('.goods' + i).find('.shops-btm-r').html(data[i].deliveryAddress);
    $('#num' + i).attr("href", "goodsdetail.html?goodsID=" + data[i].goodsID);
  }
}
function goodstype(data) {
  for (var i = 0; i < 10; i++) {
    $('.num' + i).find('a').html(data[0][i].typename + `<i
    class="bi bi-chevron-right"></i>`)
  }
}

function goodsdetailnum1(data) {
  var str1, str2, str3;
  var str = location.href;
  var num = str.indexOf("?");
  str1 = str.substr(num + 1);
  str2 = str1.replace(/[^\d]/g, ' ');
  str3 = str2.slice(-7);
  str3 = getgoodsID()
  $('.product-information').find('h2').html(data[str3 - 1].goodsIntroduction)
  $('.product-information').find('.price').children('span').html(data[str3 - 1].goodsprice + `&nbsp;&nbsp;元`)
  $('.product-information').find('.address').children('span').html(data[str3 - 1].deliveryAddress)
  $('.goodsdetail-img').children('img').replaceWith('<img src="' + data[str3 - 1].goodspictures + '" alt="">')
  $('.main-nortitle').html(data[str3 - 1].goodsname);
  $('.store-address').html(data[str3 - 1].deliveryAddress);
  $('.spe').html(data[str3 - 1].deliveryAddress);
}
function date() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  $('.new-time').html('更新时间：' + year + '年' + month + '月' + day + '日')
}
$('.next').click(function () {
  $('.pagination').find('.numb.active').next().addClass('active');
  $('.pagination').find('.numb.active').prev().removeClass('active');

})
$('.prev').click(function () {
  $('.pagination').find('.numb.active').prev().addClass('active');
  $('.pagination').find('.numb.active').next().removeClass('active');
})

function getgoodsID() {
  let searchUrl = window.location.href;
  let searchData = searchUrl.split("="); //截取 url中的“=”,获得“=”后面的参数
  let searchText1 = decodeURI(searchData[1]); //decodeURI解码
  let num2 = searchText1.replace(/[^\d]/g, " "); //num2 : 2021
  return num2;
}

function getInfo() {
  var id=-1;
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers就是请求头配置对象
    headers: {
      authorization: localStorage.getItem('token') || ''
    },
    async:false,
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
        // return 0
      }
      // 传userid
      id=res.data.UserID
    }
  })
  return id;
}

function check(){
  let dataa={goodsID:getgoodsID(),UserID:getInfo()}
  $.ajax({
      type:"post",
      url:"/api/check",
      data:dataa,
      async:false,
      success: function(res){
        console.log(res.data);
        switchbutton(res.data);
      }
  });
}

function switchbutton(data){
  if(data!=0){
    let cobutton=document.getElementById("collectbutton")
    cobutton.innerHTML="取消收藏"
    cobutton.onclick=collected;
    cobutton.style.background='green';
  }
}

function collect() {
  let dataa = { goodsID: getgoodsID(), UserID: getInfo() }
  console.log(dataa.UserID)
  let coedbutton = document.getElementById("collectbutton")
  coedbutton.innerHTML = "取消收藏"
  coedbutton.style.background = 'green';
  coedbutton.onclick=collected;
  $.ajax({
    type: "post",
    url: "/api/collect",
    data: dataa,
    success: function (res) {
      console.log('ok');
    }
  });
}

function collected(){
  let dataa={goodsID:getgoodsID(),UserID:getInfo()}
  $.ajax({
      type:"post",
      url:"/api/collected",
      data:dataa,
      success: function(res){
        switchtocollectbutton(res.data)
      }
  });
    let coedbutton=document.getElementById("collectbutton")
    coedbutton.innerHTML="收藏商品"
    coedbutton.onclick=collect;
    coedbutton.style.background='red';
}



