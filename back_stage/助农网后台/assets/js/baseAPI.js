//每次调用$.get()或者$.post()或者$.ajax()先调用此函数，拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
	//在发起真正的ajax请求之前统一拼接请求的根路径
	options.url = 'http://127.0.0.1:3007' + options.url
	//console.log(options.url)

//统一为有权限的接口设置headers请求头
if(options.url.indexOf('/api/') !==-1){
	options.headers = {
		Authorization:localStorage.getItem('token') || ''
	}
}

//全局统一挂载complete函数
options.complete = function(res){
			// console.log('执行了object回调')
			console.log(res)
			//拿到服务器响应返回的数据
			if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败了！'){
				localStorage.removeItem('token')
				location.href = '/项目3/login.html'
			}
		}
		
		
})