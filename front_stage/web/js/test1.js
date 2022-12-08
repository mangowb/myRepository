$(function () { 
    all();
    getgoodsType();
    date();
    check();
    tabchange();
  })
function all(){
    $.ajax({
        url:'/api/goods',
        type:'get',
        success:function(res){
            goodsdetail(res);
         goodsdetailnum1(res);
        }
    })
}
function getgoodsType(){
    $.ajax({
      url: '/api/goodtype',
      type:'get',
      success: function (res) {
         goodstype(res);
         console.log(res);
      }
    })
  }
function goodsdetail(data) {
    for(let i=0;i<10;i++){
      $('.goods'+i).children('img').replaceWith('<img src="'+data[i].goodspictures+'" alt="">')
      $('.goods'+i).find('.title').html(data[i].goodsIntroduction)
      $('.goods'+i).find('.sp1').html(data[i].goodsprice)
      $('.goods'+i).find('.shops-btm-r').html(data[i].deliveryAddress)
      $('#num'+i).attr({"href":"goodsdetail.html?UserID="+geturl()+"&goodsID="+data[i].goodsID});
    }
  }
//   function geturl(){
//     let searchUrl = window.location.href;
//     let searchData = searchUrl.split("="); //截取 url中的“=”,获得“=”后面的参数
//     let searchText = decodeURI(searchData[1]); //decodeURI解码
//     return searchText;  
// }
function  goodstype(data){
    for(let i=0;i<10;i++){
      $('.num'+i).find('a').html(data[0][i].typename+`<i
      class="bi bi-chevron-right"></i>`)
    }
}
  function goodsdetailnum1(data) {
    let str1,str2,str3;
    let str=location.href;
    let num=str.indexOf("?")
    str1=str.substr(num+1);
    str2 = str1.replace(/[^\d]/g, ' ');
    str3= str2.slice(-5);
    str3=parseInt(str3);
    $('.product-information').find('h2').html(data[str3-1].goodsIntroduction)
    $('.product-information').find('.price').children('span').html(data[str3-1].goodsprice+`&nbsp;&nbsp;元/斤`)
    $('.one_price').html(data[str3-1].goodsprice+`&nbsp;&nbsp;元/斤`)
    $('.one_price').attr('value',data[str3-1].goodsprice)
    $('.one_price').attr('disabled','disabled')
    $('.product-information').find('.address').children('span').html(data[str3-1].deliveryAddress)
    $('.goodsdetail-img').children('img').replaceWith('<img src="'+data[str3-1].goodspictures+'" alt="">')
    $('.store-address').html(data[str3-1].deliveryAddress)
    $('.spe').html(data[str3-1].deliveryAddress)
    $('.main-nortitle').html(data[str3-1].goodsname)
  }
  
  function date(){
    let date=new Date();
    let year=date.getFullYear();
    let month=date.getMonth()+1;
    let day=date.getDate();
    $('.new-time').html('更新时间：'+year+'年'+month+'月'+day+'日')
  }
  function tabchange(){
    var lis1 = document.querySelectorAll(".list>ul>li")
    var re = document.querySelectorAll("#listCon>div")
    for (let i = 0; i < lis1.length; i++) {
      lis1[i].onclick = function () 
      {
        for (var j = 0; j < lis1.length; j++) {
          lis1[j].className = ''
          re[j].style.display = 'none';
          lis1[j].style.backgroundColor= '#fff'
        }
        this.className = 'active'
        re[i].style.display = 'block'
        lis1[i].style.backgroundColor= '#36bf3e'
      }
    }
   }
  function getUserID(){
    let searchUrl = window.location.href;
    let searchData = searchUrl.split("="); //截取 url中的“=”,获得“=”后面的参数
    let searchText1 = decodeURI(searchData[1]); //decodeURI解码
    let searchText2 = decodeURI(searchData[2]); //decodeURI解码
    let num2 = searchText1.replace(/[^\d]/g, " "); //num2 : 2021
    return num2;
}
function getgoodsID(){
    let searchUrl = window.location.href;
    let searchData = searchUrl.split("="); //截取 url中的“=”,获得“=”后面的参数
    let searchText1 = decodeURI(searchData[1]); //decodeURI解码
    let searchText2 = decodeURI(searchData[2]); //decodeURI解码
    return searchText2;
}
// function collect(){
//   let dataa={goodsID:getgoodsID(),UserID:getUserID()}
//   console.log(dataa.UserID)
//   $.ajax({
//       type:"post",
//       url:"http://127.0.0.1:80/collect",
//       data:dataa,
//       success: function(data){

//       }
//   });

// }
function check(){
  let dataa={goodsID:getgoodsID(),UserID:getUserID()}
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
function collect(){
  let dataa={goodsID:getgoodsID(),UserID:getUserID()}
  console.log(dataa.UserID)
  let coedbutton=document.getElementById("collectbutton")
  coedbutton.innerHTML="取消收藏"
  coedbutton.style.background='green';
  coedbutton.onclick=collected;
  $.ajax({
      type:"post",
      url:"/api/collect",
      data:dataa,
      success: function(data){
      }
  });

}
function collected(){
  let dataa={goodsID:getgoodsID(),UserID:getUserID()}
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
function switchbutton(data){
  if(data!=0){
    let cobutton=document.getElementById("collectbutton")
    cobutton.innerHTML="取消收藏"
    cobutton.onclick=collected;
    cobutton.style.background='green';
  }
}
function switchtocollectbutton(data){
  if(data!=0){
    let cobutton=document.getElementById("collectbutton")
    cobutton.innerHTML="收藏商品"
    cobutton.onclick=collect;
  }
}
		/*当点击调用此方法后,将悬浮窗口显示出来,背景变暗*/
		function displayWindow() {
			/*悬浮窗口的显示,需要将display变成block*/
			document.getElementById("window").style.display = "block";
			/*将背景变暗*/
			document.getElementById("shadow").style.display = "block";
		}

		/*当点击调用此方法,将悬浮窗口和背景全部隐藏*/
		function hideWindow() {
			document.getElementById("window").style.display = "none";
			document.getElementById("shadow").style.display = "none";
		}
        function jia() {
            console.log("jia")
            let txt=document.getElementById("txt");
            let a=txt.value;
            a++;
            txt.value=a;
            sumprice();
        }
        function jian() {
            console.log("jian")
            let txt=document.getElementById("txt");
            let b=txt.value;
            b--
            if(b>1){txt.value=b--}
            else {txt.value=1}
            sumprice();
        }  
        function sumprice(){
            let oneprice=document.getElementById("oneprice")
            let numbers=document.getElementById("txt")
            let allprice=document.getElementById("allprice")
            let realprice=document.getElementById("realprice")
            let allprices=oneprice.value*numbers.value
            allprices.toFixed(2)
            allprice.value=allprices
            realprice.value=allprices
        }
        function creat_deal(){
            let oneprice=document.getElementById("oneprice")
            let numbers=document.getElementById("txt")
            let allprices=oneprice.value*numbers.value
        }
        function buygood(){
            let allprices=document.getElementById("allprice").value
            let realprice=document.getElementById("realprice").value
            let goodsID=getgoodsID()
            let UserID=getUserID()
            console.log(allprices)
            console.log(realprice)
            console.log(goodsID)
            console.log(UserID)
            let xinxi={goodsID:goodsID,UserID:UserID,allprices:allprices,realprice:realprice}
            $.ajax({
              type:"post",
              url:"http://127.0.0.1:80/buygood",
              data:xinxi,
              success: function(res){
              }
          });
        }
        
        function tabchange(){
          var lis1 = document.querySelectorAll(".list>ul>li")
          var re = document.querySelectorAll("#listCon>div")
          for (let i = 0; i < lis1.length; i++) {
            lis1[i].onclick = function () 
            {
              for (var j = 0; j < lis1.length; j++) {
                lis1[j].className = ''
                re[j].style.display = 'none';
                lis1[j].style.backgroundColor= '#fff'
              }
              this.className = 'active'
              re[i].style.display = 'block'
              lis1[i].style.backgroundColor= '#36bf3e'
            }
          }
         }
