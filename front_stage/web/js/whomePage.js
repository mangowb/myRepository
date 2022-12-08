function startTime() {
	var date =  new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	
	document.getElementById("startTime").innerHTML = year + "年" + month + "月" + day + "日";

};
setInterval("startTime()", 1000);

/*var date = $("#startTime").data("datetimepicker").getDate(),
    formatted = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
alert(formatted);*/

var speed = 50
var _hide = document.getElementById("hide-ctn");
var _con1 = document.getElementById("con1");
var _con2 = document.getElementById("con2");
con2.innerHTML=con1.innerHTML
function Marquee(){
	if(_con2.offsetHeight-_hide.scrollTop<=0){
	_hide.scrollTop-=_con1.offsetHeight;
	}else{
	_hide.scrollTop++;
	}
}
var MyMar=setInterval(Marquee,speed)
_hide.οnmοuseοver=function() {clearInterval(MyMar)}
_hide.οnmοuseοut=function() {MyMar=setInterval(Marquee,speed)}
