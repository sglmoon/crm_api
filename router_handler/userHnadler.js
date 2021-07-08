//引用db
const db = require('../db/index')
const bcrypt = require('bcryptjs')

//用户注册
exports.regUser = (req, res) => {
    let userInfo = req.body

    // userSchema验证规则已处理空值判断
    // if (!userInfo.userName || !userInfo.pwd) {
    //     return res.msg('用户名和密码不能为空！')
    // }
    //判断用户是否存在
    let sql = 'select 1 from sys_user where userName=?'
    db.query(sql, userInfo.userName, (err, data) => {
        if (err) {
            return res.msg(err)
        }
        if (data.length > 0) {
            return res.msg('该用户已存在！')
        }
        //密码加密
        let userSchema = {
            userName: userInfo.userName,
            //hashSync加密方法：明文,随机盐长度
            pwd: bcrypt.hashSync(userInfo.pwd, 10)
        }
        let sql2 = 'insert into sys_user set ?'
        db.query(sql2, userSchema, (err, data) => {
            if (err) {
                return res.msg(err)
            }
            //根据受影响行数判断是否新增成功
            if (data.affectedRows !== 1) {
                return res.msg('用户注册失败！')
            }
            res.msg('注册成功！', 1)
        })
    })

    // res.send('ok')
}

//用户登录
exports.login = (req, res) => {
    res.send('ok')
}