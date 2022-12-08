// 导入数据库模块
const db = require('../db/index')
// 导入bcrypt.js这个包
const bcrypt = require('bcryptjs')

// 获取用户信息的处理函数
exports.getUserInfo = (req, res) => {
    // 根据用户id，查找用户的基本信息
    // 防止密码泄露，排除密码字段
    const sql = 'select UserID,nickname,phone from user where UserID=? '
    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的。只要身份认证成功了，在req身上就会多一个 user 属性，它是一个对象，里面会包含用户的id
    db.query(sql, req.user.UserID, (err, results) => {
        // 1. 执行 SQL 语句失败  
        if (err) return res.cc(err)
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1  
        if (results.length !== 1) return res.cc('获取用户信息失败！')
        // 3. 将用户信息响应给客户端  
        res.send({ status: 0, message: '获取用户基本信息成功！', data: results[0], })
    })
}

// 更新用户密码的处理函数
exports.updatePassword = (req, res) => {
    // 根据id查询用户的信息
    const sql = 'select * from user where UserID=?'
    // 执行sql语句
    db.query(sql, req.user.UserID, (err, results) => {
        // 1. 执行 SQL 语句失败  
        if (err) return res.cc(err)
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1  
        if (results.length !== 1) return res.cc('获取用户信息失败！')
        // 判断新旧密码是否一致
        // 判断密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('旧密码错误！')

        // 更新数据库中的密码
        // 定义更新用户密码的sql语句
        const sql = 'update user set password=? where UserID=?'
        // 对新密码进行bcrypt加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        // 执行sql语句
        db.query(sql, [newPwd, req.user.UserID], (err, results) => {
            // 1. 执行 SQL 语句失败  
            if (err) return res.cc(err)
            // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1  
            // if (results.length !== 1) return res.cc('更新密码失败！')
            // 更新密码成功
            res.cc('更新密码成功',0)
        })
    })
}