const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'wwww1210',
    database: 'zhunong',
    multipleStatements: true,
})

module.exports = db