//const db = require('../db')

// 导入数据库操作模块
const db = require('../db/index')

// 获取商品分类列表的处理函数
exports.getGoodType = (req, res) => {
    // 获取所有商品类型
    const sql = 'select * from goodtype where is_delete=0 and (fatherID between 1 and 8) '//or fatherID = 2 or fatherID = 3
    // 'select typename from goodtype where fatherID=0;select typename from goodtype where fatherID=1;'
    // select typename from goodtype where fatherID=2;select typename from goodtype where fatherID=3;select typename from goodtype where fatherID=4;select typename from goodtype where fatherID=5;select typename from goodtype where fatherID=6;select typename from goodtype where fatherID=7;select typename from goodtype where fatherID=8;select typename from goodtype where fatherID=55;'
    db.query(sql, (err, results) => {
        // 1.执行sql语句失败
        if (err) return res.cc(err)
        // 2.执行sql语句成功
        res.send({
            status: 0,
            message: '获取商品类型成功！',
            data: results,
			total:results.length,
        })
    })
}

// 根据 Id 获取商品分类的处理函数
exports.getGoodTypeId = (req, res) => {
	// res.send('ok')
  // 定义根据 ID 获取商品分类数据的 SQL 语句
  const sql = `select * from goodtype where typeID=?`
  // 调用 db.query() 执行 SQL 语句
  db.query(sql, req.params.typeID, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取商品分类数据失败！')
    res.send({
      status: 0,
      message: '获取商品分类数据成功！',
      data: results[0],
    })
  })
}

// 新增商品分类的处理函数
exports.addGoodType = (req, res) => {
   //res.send('ok')
  // 1. 定义查重的 SQL 语句
  const sql = `select * from goodtype where typename=?`
  // 2. 执行查重的 SQL 语句
  db.query(sql, [req.body.typename], (err, results) => {
    // 3. 判断是否执行 SQL 语句失败
    if (err) return res.cc(err)

    // 4.1 判断数据的 length
    // 4.2 length 等于 1 的2种情况
    if (results.length === 1 && results[0].typename === req.body.typename) return res.cc('分类名称被占用，请更换后重试！')

    // 定义插入商品分类的 SQL 语句
    const sql = `insert into goodtype set ?`
    // 执行插入商品分类的 SQL 语句
    db.query(sql, req.body, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('新增商品分类失败！')
      res.cc('新增商品分类成功！', 0)
    })
  })
}


// 删除商品分类的处理函数
exports.deleteGoodTypeId = (req, res) => {
	// res.send('ok')
	// 定义标记删除的 SQL 语句
	const sql = `update goodtype set is_delete=1 where typeID=?`
	// 调用 db.query() 执行 SQL 语句
	db.query(sql, req.params.typeID, (err, results) => {
		if (err) return res.cc(err)
		if (results.affectedRows !== 1) return res.cc('删除商品分类失败！')
		res.cc('删除商品分类成功！', 0)
	})
}


// 根据 Id 更新商品分类的处理函数
exports.updateGoodTypeID = (req, res) => {
	// res.send('ok')
	// 定义查重的 SQL 语句
	const sql = `select * from goodtype where typeID<>? and typename=?`
	// 调用 db.query() 执行查重的 SQL 语句
	db.query(sql, [req.body.typeID, req.body.typename], (err, results) => {
		// 执行 SQL 语句失败
		if (err) return res.cc(err)
		// 判断名称被占用的情况
		if (results.length === 1 && results[0].typename === req.body.typename) return res.cc('分类名称被占用，请更换后重试！')
		
		
		// 定义更新商品分类的 SQL 语句
		const sql = `update goodtype set ? where typeID=?`
		// 执行更新商品分类的 SQL 语句
		db.query(sql, [req.body, req.body.typeID], (err, results) => {
		  if (err) return res.cc(err)
		  if (results.affectedRows !== 1) return res.cc('更新商品分类失败！')
		  res.cc('更新商品分类成功！', 0)
		})
	})
}