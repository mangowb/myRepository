// //商品的路由模块
const express = require('express')
const router = express.Router()

// 导入需要的处理函数模块
const goods_handler = require('../router_handler/goods')
// 导入 multer 和 path
const multer = require('multer')
const path = require('path')

// 创建 multer 的实例
const uploads = multer({ dest: path.join(__dirname, '../uploads') })
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
// const {add_goods_schema} = require('../schema/goods')
const { add_goods_schema, delete_goods_schema, get_goods_schema, update_goods_schema } = require('../schema/goods')

// // 获取商品列表数据的路由
router.get('/list', goods_handler.getGoods)
// 根据 Id 删除商品列表的路由
router.get('/deletegoods/:goodsID', expressJoi(delete_goods_schema), goods_handler.deleteGoodsID)
// // 根据 Id 获取商品列表的路由
router.get('/:goodsID', expressJoi(get_goods_schema), goods_handler.getGoodsID)
// // 根据 Id 更新商品列表的路由
router.post('/updategoods', uploads.single('goodspictures'), expressJoi(update_goods_schema), goods_handler.updateGoodsID)
// 发布商品的路由
// router.post('/add',(req,res)=>{
// 	res.send('ok')
// })

router.post('/add', uploads.single('goodspictures'), expressJoi(add_goods_schema), goods_handler.addGoods)


//router.post('/add',goods_handler.addGoods)


module.exports = router
