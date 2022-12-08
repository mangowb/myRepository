// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()
const mysql=require('mysql');
const joi=require('@hapi/joi')

// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())

app.use(express.urlencoded({ extended: false }))

const connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'wwww1210',
  database:'zhunong'
});


app.get('/sjk',function(req,res){
  let sql=`select * from goods where goodstype=9`
  connection.query(sql,(err,results)=>{
   res.setHeader('Access-control-allow-origin','*');
   res.setHeader('Access-control-allow-header','*');
   res.send(results);              
  })
});
app.get('/sk',function(req,res){
   let sql=`select * from goodtype where fatherID=0`
    connection.query(sql,(err,result)=>{
    res.setHeader('Access-control-allow-origin','*');
    res.setHeader('Access-control-allow-header','*');
    res.send(result);
   })
});

app.post("/collect",function(req,res){
   const sql='Insert into collection values(?,?)'
   connection.query(sql,[req.body.UserID,req.body.goodsID],function (error, results, fields){
   if (error) throw error;
   console.log('收藏成功');
 })
})
app.post("/check",function(req,res){
   console.log('检查')
   const sql='select * from collection where UserID=? and goodsID=?'
   connection.query(sql,[req.body.UserID,req.body.goodsID],function (error, results, fields){
   if (error) throw error;
   res.send({status:0,data:Object.keys(results).length})
 })
})
app.post("/collected",function(req,res){
   console.log('取消')
   const sql='delete from collection where UserID=? and goodsID=?'
   connection.query(sql,[req.body.UserID,req.body.goodsID],function (error, results, fields){
   if   (error) throw error;
 })
})
app.post("/buygood",function(req,res){
  console.log("购买商品")
  const sql='insert from trading_information values()'
})

// 一定要在路由之前封装res.cc函数
app.use((req,res,next)=>{
  // status默认值是1，表示失败的情况
  // err的值，可能是一个错误对象，也可能是一个错误的描述字符串
  res.cc=function(err,status=1){
    res.send({
      status,
      message:err instanceof Error ? err.message:err
    })
  }
  next()
})

// 在路由之前配置解析token的中间件
const expressJWT=require('express-jwt')
const config =require('./config')
// 配置解析 Token 的中间件
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api/]}))


// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)  //意思是：在访问userRouter这个路由模块时都要加上/api前缀
// 导入并使用用户信息模块
const userinfoRouter=require('./router/userinfo')
app.use('/my',userinfoRouter)
// 导入并使用商品类型模块
const goodsRouter=require('./router/goods')
app.use('/api',goodsRouter)

// 定义错误级别的中间件
app.use((err,req,res,next)=>{
  if(err instanceof joi.ValidationError ) return res.cc(err)
  // 捕获并处理 Token 认证失败后的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知错误
  res.cc(err)

})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('api server running at http://127.0.0.1:80')
})
