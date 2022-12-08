// 商品的处理函数模块
const path = require('path')
const db = require('../db/index')

// 获取商品列表的处理函数
exports.getGoods = (req, res) => {
    // 获取所有商品
    const sql = 'select goods.*,goodtype.typename from goods,goodtype where goods.goodstype=goodtype.typeID and goods.is_delete = 0 and goodtype.is_delete = 0 ' // 
    // 'select typename from goodtype where fatherID=0;select typename from goodtype where fatherID=1;'
    // select typename from goodtype where fatherID=2;select typename from goodtype where fatherID=3;select typename from goodtype where fatherID=4;select typename from goodtype where fatherID=5;select typename from goodtype where fatherID=6;select typename from goodtype where fatherID=7;select typename from goodtype where fatherID=8;select typename from goodtype where fatherID=55;'
    db.query(sql, (err, results) => {
        // 1.执行sql语句失败
        if (err) return res.cc(err)
        // 2.执行sql语句成功
        res.send({
            status: 0,
            message: '获取商品成功！',
            data: results,
			total:results.length,
        })
    })
}


// 根据 Id 获取商品的处理函数
exports.getGoodsID = (req, res) => {
	// res.send('ok')
  // 定义根据 ID 获取商品数据的 SQL 语句
  const sql = `select * from goods where goodsID=?`
  // 调用 db.query() 执行 SQL 语句
  db.query(sql, req.params.goodsID, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取商品数据失败！')
    res.send({
      status: 0,
      message: '获取商品数据成功！',
      data: results[0],
    })
  })
}


// 删除商品的处理函数
exports.deleteGoodsID = (req, res) => {
	// // res.send('ok')
	// // 定义标记删除的 SQL 语句
	// const sql = `update goods set is_delete=1 where goodsID=?`
	// // 调用 db.query() 执行 SQL 语句
	// db.query(sql, req.params.goodsID, (err, results) => {
	// 	if (err) return res.cc(err)
	// 	if (results.affectedRows !== 1) return res.cc('删除商品失败！')
	// 	res.cc('删除商品成功！', 0)
	// })
	const sql = `update goods set is_delete=1 where goodsID=?`
	db.query(sql, req.params.goodsID, (err, results) => {
	  if (err) return res.cc(err)
	  if (results.affectedRows !== 1) return res.cc('删除商品失败！')
	  res.cc('删除商品成功！', 0)
	})
}


// 根据 Id 更新商品的处理函数
exports.updateGoodsID = (req, res) => {
	// res.send('ok')
	console.log(req.body)
	console.log(req.file)
	// 定义查重的 SQL 语句
	const sql = `select * from goods where goodsID<>? and goodsname=?`
	const goodsInfo = {
	  // 商品名字、介绍、所属分类的Id
	  ...req.body,
	  // 商品封面的存放路径
	  goodspictures: path.join('/uploads', req.file.filename),
	  // 商品的发布时间
	  updateTime: new Date(),
	  // 商品类型的Id
	  goodstype: req.body.goodstype,
	}
	// 调用 db.query() 执行查重的 SQL 语句
	db.query(sql, [req.body.goodsID, req.body.goodsname], (err, results) => {
		// 执行 SQL 语句失败
		if (err) return res.cc(err)
		// 判断名称被占用的情况
		if (results.length === 1 && results[0].goodsname === req.body.goodsname) return res.cc('商品名称被占用，请更换后重试！')
		
		
		// 定义更新商品的 SQL 语句
		const sql = `update goods set ? where goodsID=?`
		// 执行更新商品的 SQL 语句
		db.query(sql, goodsInfo, (err, results) => {
		  if (err) return res.cc(err)
		  if (results.affectedRows !== 1) return res.cc('更新商品失败！')
		  res.cc('更新商品成功！', 0)
		})
	})
}
// 发布商品的处理函数
exports.addGoods = (req, res) => {
	//res.send('ok')
  console.log(req.body)
  console.log(req.file)
  
  if (!req.file || req.file.fieldname !== 'goodspictures') return res.cc('商品封面是必选参数！')

  // TODO：证明数据都是合法的，可以进行后续业务逻辑的处理
  // 处理商品的信息对象
  const goodsInfo = {
    // 商品名字、介绍、所属分类的Id
    ...req.body,
    // 商品封面的存放路径
    goodspictures: path.join('/uploads', req.file.filename),
    // 商品的发布时间
    updateTime: new Date(),
    // 商品类型的Id
    goodstype: req.body.goodstype,
  }
  const sql = `insert into goods set ?`
  db.query(sql, goodsInfo, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('发布新商品失败！')
    res.cc('发布商品成功！', 0)
  })
}








