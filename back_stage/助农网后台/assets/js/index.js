$(function() {
  // 调用 getUserInfo 获取用户基本信息
  getUserInfo()

  var layer = layui.layer

  // 点击按钮，实现退出功能
  $('#btnLogout').on('click', function() {
    // 提示用户是否确认退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
      //do something
      // 1. 清空本地存储中的 token
      localStorage.removeItem('token')
      // 2. 重新跳转到登录页面
      location.href = '/项目3/login.html'

      // 关闭 confirm 询问框
      layer.close(index)
    })
  })
})

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/api/userinfo',
	data:{
		UserID:localStorage.getItem('UserID'),	
	},
    success: function(res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      // 调用 renderAvatar 渲染用户的头像
      renderAvatar(res.data)
    }
    // 不论成功还是失败，最终都会调用 complete 回调函数
    // complete: function(res) {
    //   // console.log('执行了 complete 回调：')
    //   // console.log(res)
    //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     // 1. 强制清空 token
    //     localStorage.removeItem('token')
    //     // 2. 强制跳转到登录页面
    //     location.href = '/login.html'
    //   }
    // }
  })
}

// 渲染用户的头像
function renderAvatar(users) {
	// 1. 获取用户的名称
	var name = users.nickname 
	// 2. 设置欢迎的文本
	$('#welcome').html('欢迎&nbsp;&nbsp;' + name)
	// 3. 按需渲染用户的头像
	//渲染文本头像
	$('.layui-nav-img').hide()
	var first = name[0].toUpperCase()
	$('.text-avatar')
	  .html(first)
	  .show()
  
}


// $(function(){
// 	// 调用 getUserInfo 获取用户基本信息
// 	getUserInfo()
	
// 	var layer = layui.layer
// 	//实现退出
// 	$('#btnLogout').on('click',function(){
// 		//提示用户是否退出
// 		layer.confirm('确定退出吗？', {icon: 3, title:'提示'}, function(index){
// 		  //do something
// 		  console.log('ok')
		  
// 		  //清空本地存储的token
// 		  localStorage.removeItem('token')
// 		  //跳转到登陆页面
// 		  location.href = '/项目3/login.html'
// 		  //关闭comfirm询问框
// 		  layer.close(index);
// 		});    
// 	})
// })

// //获取用户信息
// function getUserInfo(){
	
// 	$.ajax({
// 		method: 'GET',
// 		url: '/my/userinfo',
// 		//请求头配置对象
// 		// headers:{
// 		// 	Authorization:localStorage.getItem('token')||'',
// 		// },
// 		// data:{
// 		// 	UserID:localStorage.getItem('UserID')
// 		// },
// 		// data:$('#form_login').serialize(),
// 		success:function(res){
// 			if(res.status !== 0){
// 				return layui.layer.msg('获取用户信息失败了！')
// 			}
			
// 			//调用renderAvatar 渲染用户头像
// 			renderAvatar(res.data)
// 		}
// 		//无论成功还是失败都会调用complete回调函数
// 		/*cmoplete:function(res){
// 			console.log('执行了object回调')
// 			console.log(res)
// 			//拿到服务器响应返回的数据
// 			if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
// 				localStorage.removeItem('token')
// 				location.href = '/login.html'
// 			}
// 		}*/
// 	})
// }



// //渲染用户的头像
// function renderAvatar(user){
// 	//获取用户昵称
// 	var name = user.nickname
// 	//设置欢迎文本
// 	$('#welcome').html('欢迎&nbsp;&nbsp;' + name)
// 	//按需要渲染用户头像
	
// 	//渲染文本头像
// 	$('.layui-nav-img').hide()
// 	var first = name[0].toUpperCase()
// 	$('.text-avatar').html(first).show()
	
// }
