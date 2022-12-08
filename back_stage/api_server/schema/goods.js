const joi = require('joi')

// 分别定义 标题、分类Id、内容、发布状态的校验规则
const goodsID = joi.number().integer().min(1).required()//商品id
const goodsname = joi.string().required()//商品名字
const goodstype = joi.number().integer().min(1).required()//商品所属类别
const goodsprice = joi.number().min(1).required()//商品价格
const goodsIntroduction = joi.string().required()//商品详情介绍
const deliveryAddress = joi.string().required()//发货地址

//const state = joi.string().valid('已发布', '草稿').required()
//  向外共享验证规则对象
// 验证规则对象 - 删除商品
exports.delete_goods_schema = {
  params: {
   goodsID,
  },
}

// 验证规则对象 - 根据 Id 获取商品
exports.get_goods_schema = {
  params: {
	  goodsID,
  },
}

// 验证规则对象 - 更新商品
exports.update_goods_schema = {
  body: {
	goodsID,
    goodsname,
    goodstype,
    goodsprice,
    goodsIntroduction,
    deliveryAddress,
    // alias,
  },
}
// 验证规则对象 - 发布商品
exports.add_goods_schema = {
  body: {
    goodsname,
    goodstype,
    goodsprice,
	goodsIntroduction,
    // diliveryAddress,
  },
}