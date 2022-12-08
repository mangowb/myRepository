// 导入数据库操作模块
const db = require('../db/index')
// 导入bcrypt.js这个包
const bcrypt = require('bcryptjs')
// 导入生成token的包
const jwt=require('jsonwebtoken')
// 导入全局的配置文件
const config=require('../config')

// 注册新用户的处理函数
exports.reguser = (req, res) => {
    // 获取客户端提交到服务器的用户信息
    const userinfo = req.body
    // 对表单中的数据，进行合法性的校验
    // if (!userinfo.nickname || !userinfo.phone || !userinfo.password) {
    //     return res.cc('用户名、电话或密码不合法！') // return res.send({ status: 1, message: '用户名、电话或密码不合法！' }) 
    // }

    //定义sql语句，查询用户名是否被占用
    const sqlStr = 'select * from users where nickname=?'
    db.query(sqlStr, userinfo.nickname, (err, results) => {
        // 执行sql语句失败
        if (err) {
            return res.cc(err) // return res.send({ status: 1, message: err.message })
        }
        // 判断用户名是否被占用
        if (results.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名！') // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
        }
        // 调用bcrypt.hashSync()对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 6)
        // 定义插入新用户的sql语句
        const sql='insert into users set ?'
        // 调用db.query()执行sql语句
        data={nickname:userinfo.nickname,password:userinfo.password,phone:userinfo.phone}
        db.query(sql,data,(err,results)=>{
            // 判断sql语句是否成功
             if(err) return res.cc(err) //  return res.send({status:1,message: err.message})
            // 判断影响行数是否为1
            // if(results.affectdRows !==1 ) return res.send({status:1,message:'注册用户失败，请稍后再试！'})

            // 注册用户成功
            res.cc('注册成功！',0) // res.send({status:0,message:'注册成功！'})
            
        })

    })
}


// 登录的处理函数
exports.login = (req, res) => {
    // 接收表单的数据
    const userinfo=req.body
    // 定义sql语句
    const sql='select * from users where nickname=?'
    // 执行sql语句，根据昵称查询用户的信息
    db.query(sql,userinfo.nickname,(err,results)=>{
        // 执行sql语句失败
        if(err) return res.cc(err)
        // 执行sql语句成功，但是获取到的数据条数不等于1
        // if(results.length!==1) return res.cc('登录失败！')
        // 判断密码是否正确
        const compareResult= bcrypt.compareSync(userinfo.password,results[0].password)
        if(!compareResult) return res.cc('登陆失败！')
        // 在服务器生成token的字符串
        const user={...results[0],password:''}
        // 对用户信息加密，生成token字符串
        const tokenStr=jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn})
        // 调研res.send()将token响应给客户端
		console.log(results[0].UserID);
        res.send({
            status:0,
            message:'登录成功！',
			UserID: results[0].UserID,
            token:'Bearer '+tokenStr,	
        })
    })
}