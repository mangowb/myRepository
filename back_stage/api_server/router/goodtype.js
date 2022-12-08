
// 这是商品分类的路由模块

const express = require('express')
const router = express.Router()

// 导入商品分类的路由处理函数模块
const goodType_handler = require('../router_handler/goodtype')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { add_goodtype_schema, delete_goodtype_schema, get_goodtype_schema, update_goodtype_schema } = require('../schema/goodtype')

// 获取商品分类列表数据的路由
router.get('/goodtype', goodType_handler.getGoodType)
// 新增商品分类的路由
//router.post('/addgoodtype', goodType_handler.addGoodType)
router.post('/addgoodtype', expressJoi(add_goodtype_schema), goodType_handler.addGoodType)
// 根据 Id 删除商品分类的路由
router.get('/deletegoodtype/:typeID', expressJoi(delete_goodtype_schema), goodType_handler.deleteGoodTypeId)
// 根据 Id 获取商品分类的路由
router.get('/goodtype/:typeID', expressJoi(get_goodtype_schema), goodType_handler.getGoodTypeId)
// 根据 Id 更新商品分类的路由
router.post('/updategoodtype', expressJoi(update_goodtype_schema), goodType_handler.updateGoodTypeID)

module.exports = router