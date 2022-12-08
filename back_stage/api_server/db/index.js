const mysql=require('mysql')

const db=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    database:'zhunong'
})

module.exports=db