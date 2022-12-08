$(function() {
  var form = layui.form

  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: function(value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同！'
      }
    },
    rePwd: function(value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一致！'
      }
    }
  })
  
  initUserInfo()
  //初始化用户信息
  function initUserInfo(){
  	$.ajax({
  		method:'GET',
  		url:'/api/userinfo',
  		data:{
  			UserID:localStorage.getItem('UserID')
  		},
  		success:function(res){
  			if(res.status !== 0){
  				return layer.msg('获取用户信息失败！')
  			}
  			console.log(res)
  			//调用form.val()快速为表单赋值
  			form.val('formUpdatepwd',res.data)
  		}
  	})
  }
  $('.layui-form').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/updatepwd',
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layui.layer.msg('更新密码失败！')
        }
        layui.layer.msg('更新密码成功！')
        // 重置表单
        $('.layui-form')[0].reset()
      }
    })
  })
})
