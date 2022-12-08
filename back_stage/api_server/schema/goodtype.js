// 1. 导入定义验证规则的模块
const joi = require('joi')

// 2. 定义 name 和 alias 的验证规则
const typename = joi.string().required()
// const alias = joi.string().alphanum().required()//字符串、字母和数字、必填项
const typeID = joi.number().integer().min(1).required()
// id 的校验规则
const fatherID = joi.number().integer().min(1).required()

// 3. 向外共享验证规则对象

exports.add_goodtype_schema = {
  body: {
    typename,
	fatherID,
    // alias,
  },
}

// 验证规则对象 - 删除分类
exports.delete_goodtype_schema = {
  params: {
	//fatherID,
    typeID,
  },
}

// 验证规则对象 - 根据 Id 获取商品分类
exports.get_goodtype_schema = {
  params: {
    typeID,
  },
}

// 验证规则对象 - 更新分类
exports.update_goodtype_schema = {
  body: {
    typeID,
    typename,
    // alias,
  },
}