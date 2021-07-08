//加载mysql模块
const mysql = require('mysql')

//创建数据库连接池
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'crm'
})

//向外共享数据库连接db
module.exports = db