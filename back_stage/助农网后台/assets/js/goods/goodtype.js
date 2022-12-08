$(function(){
	var layer = layui.layer
	var form = layui.form
	initGoodList()
	//获取商品分类列表
	function initGoodList() {
		$.ajax({
			method:'GET',
			url:'/api/goods/goodtype',
			success: function(res) {
			    if (res.status !== 0) {
			      return layer.msg('获取商品列表失败！')
			    }
			    // 使用模板引擎渲染页面的数据
			    var htmlStr = template('tpl-table', res)
	        $('tbody').html(htmlStr)
			    // 调用渲染分页的方法
			    
			  }
			})
	}
	
	//为添加商品分类按钮绑定点击事件
	var indexAdd = null 
	$('#btnAddGoodType').on('click',function(){
		indexAdd = layer.open({
			type:1,//页面层
			area:['500px','250px'],
			title:'添加商品分类',
			content:$('#dialog-add').html()
		})
	})
	
	
	//通过代理的形式,为form-add表单绑定submit事件
	$('body').on('submit', '#form-add', function(e) {
	    e.preventDefault()
	    $.ajax({
	      method: 'POST',
	      url: '/api/goods/addgoodtype',
	      data: $(this).serialize(),
	      success: function(res) {
	        if (res.status !== 0) {
	          return layer.msg('新增分类失败！')
	        }
	        initGoodList()
	        layer.msg('新增分类成功！')
	        // 根据索引，关闭对应的弹出层
	        layer.close(indexAdd)
	      }
	    })
	  })
	
	//通过代理的形式，为btn-edit按钮绑定点击事件
	var indexEdit = null
	$('tbody').on('click', '.btn-edit', function() {
		// 弹出一个修改商品分类信息的层
		indexEdit = layer.open({
			type:1,
			area:['500px','200px'],
			title:'修改商品分类',
			content: $('#dialog-edit').html()
		})
		var id = $(this).attr('data-id')
		// 发起请求获取对应分类的数据
		$.ajax({
		  method: 'GET',
		  url: '/api/goods/goodtype/' + id,
		  success: function(res) {
		    form.val('form-edit', res.data)
		  }
		})
	})
	
	  // 通过代理的形式，为修改分类的表单绑定 submit 事件
	  $('body').on('submit', '#form-edit', function(e) {
	    e.preventDefault()
	    $.ajax({
	      method: 'POST',
	      url: '/api/goods/updategoodtype',
	      data: $(this).serialize(),
	      success: function(res) {
	        if (res.status !== 0) {
	          return layer.msg('更新分类数据失败！')
	        }
	        layer.msg('更新分类数据成功！')
	        layer.close(indexEdit)
	        initGoodList()
	      }
	    })
	  })
	
	//通过代理的形式，为删除分类按钮绑定点击事件
	$('tbody').on('click','.btn-delete',function(){
		var id = $(this).attr('data-id')
		//提示用户是否要删除商品分类
		layer.confirm('确定删除吗？', {icon: 3, title:'提示'}, function(index){
		  //do something
		  $.ajax({
			  method:'GET',
			  url:'/api/goods/deletegoodtype/' + id,
			  success:function(res){
				  if(res.status !== 0){
					  return layer.msg('删除失败！')
				  }
				  layer.msg('删除成功！')
				  //关闭comfirm询问框
				  layer.close(index);
				  initGoodList()
			  }
		  })
		})
	})
})