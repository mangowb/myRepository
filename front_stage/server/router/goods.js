const express = require('express')
const router = express.Router()

// 导入用户路由处理函数对应的模块
const goods_handler = require('../router_handler/goods')

// 获取商品类型的路由
router.get('/goodtype', goods_handler.getGoodType)
router.get('/goods', goods_handler.getGoods)
router.post('/searchgoods', goods_handler.searchgoods)
router.get('/ask',goods_handler.getpro)
router.post('/collect',goods_handler.collect)
router.post('/collected',goods_handler.collected)
router.post('/check',goods_handler.check)
router.post('/checkcollection',goods_handler.checkcollection)

module.exports = router