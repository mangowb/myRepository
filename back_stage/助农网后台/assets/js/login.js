$(function(){
	//点击“注册账号”的链接
	$('#link_reg').on('click',function(){
		$('.login-box').hide()
		$('.reg-box').show()
	})
	//点击“去登陆”的链接
	$('#link_login').on('click',function(){
		$('.login-box').show()
		$('.reg-box').hide()
	})
	
	//自定义登录密码校验规则
	var form = layui.form
	var layer = layui.layer
	
	form.verify({
		pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
		repwd: function(value){
			var pwd = $('.reg-box [name=password]').val()
			if(pwd !== value){
				return '两次密码不一致!'
			}
		}
	})
	
	
	//监听注册表单的提交事件
	$('#form_reg').on('submit',function(e){	
		e.preventDefault()//阻止默认提交行为
		console.log($('#form_reg [name=nickname]').val());
		var data = {nickname:$('#form_reg [name=nickname]').val(),password:$('#form_reg [name=password]').val()}
		//发起ajax的post请求
		$.post('/api/reguser',data,function(res){
			if(res.status !==0){
				return layer.msg(res.message)
			}
			layer.msg('注册成功!请登录')
			//注册成功自动回到登录页面
			$('#link_login').click()
		})
	})
	
	
	//监听登录表单的提交事件
	//$('#form_login').submit(false)
	$('#form_login').submit(function(e){
		e.preventDefault()//阻止默认提交行为
		$.ajax({
			url:'/api/login',
			method: 'POST',
			//快速获取表单中的数据
			data:$(this).serialize(),
			success: function(res){
				if(res.status !== 0){
					return layer.msg('登陆失败了！')
				}
				//console.log(res.token);
				//console.log(res.UserID);
				// localStorage.setItem('token',res.token)
				localStorage.setItem('UserID',res.UserID)
				layer.msg('登陆成功！')
				//alert("")
				//跳转后台主页
				location.href = '/项目3/index.html'
			}
		})
	})
})
