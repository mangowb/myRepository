const db = require('../db')

// 导入数据库操作模块
require('../db/index')


exports.getGoodType = (req, res) => {
    // 获取所有商品类型
    const sql = 'select typename from goodtype where fatherID=0;select typename from goodtype where fatherID=1; select typename from goodtype where fatherID=2;select typename from goodtype where fatherID=3;select typename from goodtype where fatherID=4;select typename from goodtype where fatherID=5;select typename from goodtype where fatherID=6;select typename from goodtype where fatherID=7;select typename from goodtype where fatherID=8;select typename from goodtype where fatherID=55;'
    db.query(sql, (err, results) => {
        // 1.执行sql语句失败
        if (err) return res.cc(err)
        // 2.执行sql语句成功
        res.send({
            status: 0,
            message: '获取商品类型成功！',
            data: results,
        })
    })
}

exports.getGoods = (req, res) => {
    // 获取商品
    const sql = 'select * from goods where goodstype=9'
    db.query(sql, (err, results) => {
        // 1.执行sql语句失败
        if (err) return res.cc(err)
        // 2.执行sql语句成功
        res.send({
            status: 0,
            message: '获取商品成功！',
            data: results,
        })
    })
}

exports.searchgoods = (req, res) => {
    var str = '%' + req.body.goodsname + '%'
    const sql = "select goodsID,goodsname from goods where goodsname like ?;"
    db.query(sql, str, (err, results) => {
        // 1.执行sql语句失败
        if (err) return res.cc(err)
        // 2.执行sql语句成功
        res.send({
            status: 0,
            message: '搜索商品成功！',
            data: results,
        })
    })
}

exports.getpro = (req, res) => {
    let sql = `SELECT * FROM procurement `
    db.query(sql, (err, results) => {
        //返回的查询信息为result 然后将其显示在页面上
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.send(results);
    })
}

exports.check = (req, res) => {
    const sql = 'select * from collection where UserID=? and goodsID=?'
    db.query(sql, [req.body.UserID, req.body.goodsID], function (error, results, fields) {
        if (error) throw error;
        res.send({ status: 0, data: Object.keys(results).length })
    })
}

exports.collect = (req, res) => {
    const sql = 'insert into collection value(?,?)'
    db.query(sql, [req.body.UserID, req.body.goodsID], function (error, results, fields) {
        if (error) throw error;
        res.send({ status: 0, data: Object.keys(results).length })
    })
}

exports.collected = (req, res) => {
    const sql = 'delete from collection where UserID=? and goodsID=?'
    db.query(sql, [req.body.UserID, req.body.goodsID], function (error, results, fields) {
        if (error) throw error;
    })
}

// exports.buygood = (req, res) => {
//     const sql='insert from trading_information values()'
// }

exports.checkcollection = (req, res) => {
    const sql = 'select * from goods where goodsID in (select goodsID from collection where userID =?)'
    db.query(sql, req.body.UserID, (err, results) => {
        // 1.执行sql语句失败
        if (err) return res.cc(err)
        // 2.执行sql语句成功
        res.send({
            status: 0,
            message: '查询收藏商品成功！',
            data: results,
        })
    })
}





