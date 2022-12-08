const express =require('express')
const router =express.Router()

// 导入路由处理函数对应的模块
const  userinfo_handler=require('../router_handler/userinfo')

// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2.导入需要的验证规则对象
const {update_password_schema } = require('../schema/user')


// 挂载路由
// 获取用户信息的路由
router.get('/userinfo',userinfo_handler.getUserInfo)
// 更改密码的路由
router.post('/updatePwd',expressJoi(update_password_schema),userinfo_handler.updatePassword)

module.exports = router