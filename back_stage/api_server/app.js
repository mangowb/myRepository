// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()
const joi = require('joi')


// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())

// 通过 express.urlencoded() 这个中间件，来解析表单中的 url-encoded 格式的数据,设置为false，那么对URL-encoded的数据的解析采用querystring库；
app.use(express.urlencoded({ extended: false }))

// 一定要在路由之前封装res.cc函数
app.use((req,res,next)=>{
  // status默认值是1，表示失败的情况
  // err的值，可能是一个错误对象，也可能是一个错误的描述字符串
  res.cc=function(err,status = 1){
    res.send({
      status,
      message:err instanceof Error ? err.message:err
    })
  }
  next()
})


 //const jwt = require("jsonwebtoken") // 导入jwt
// const {expressjwt} = require("express-jwt") //从express-jwt中解构
// const secretKEY = "xiaoshu" //密钥
// app.use(expressjwt({ secret:secretKEY, algorithms: ["HS256"] }).unless({path: [/^\/api/] })) //使用express-jwt这个中间件 排除路径为api/login
// app.post("/api/login",(req,res)=>{
//     // 获得token
//    const token = jwt.sign({username :"lam"},secretKEY,{expiresIn:"60s"})
//     res.send({
//         status:200,
//         msg:"success",
//         token
//     })
// })



// 在路由之前配置解析token的中间件
const {expressjwt} = require('express-jwt')
const config =require('./config')
// 配置解析 Token 的中间件
app.use(expressjwt({ secret:config.jwtSecretKey, algorithms: ["HS256"] }).unless({ path: [/^\/api/] }))

// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)  //意思是：在访问userRouter这个路由模块时都要加上/api前缀
// 导入并使用用户信息模块
const userinfoRouter=require('./router/userinfo')
app.use('/api',userinfoRouter)
// 导入并使用商品类型模块
// const goodtypeRouter=require('./router/goodtype')
// app.use('/api',goodtypeRouter)


// 导入并使用商品分类的路由模块
const goodTypeRouter = require('./router/goodtype')
app.use('/api/goods', goodTypeRouter)

// 导入并使用商品的路由模块
const goodsRouter = require('./router/goods')
app.use('/api/goods', goodsRouter)





// 定义错误级别的中间件
app.use((err,req,res,next)=>{
  if(err instanceof joi.ValidationError ) return res.cc(err)
  // 捕获并处理 Token 认证失败后的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败了！')
  // 未知错误
  res.cc(err)

})



// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007')
})
