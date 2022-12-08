// 注意：每次调用$.get()/$.post()/$.ajax()的时候，会先调用这个函数，在这个函数中，可以拿到为ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://127.0.0.1:80' + options.url

    // 统一为有权限的接口，设置headers请求头
    if(options.url.indexOf(/my/)!== -1){
        options.headers = {
            authorization: localStorage.getItem('token') || ''
        }
    }
    
})