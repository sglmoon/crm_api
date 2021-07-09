//引用包
const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

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
}

//用户登录
exports.login = (req, res) => {
    let loginParam = req.body;
    //根据用户名获取用户信息
    var sql = 'select * from sys_user where userName=?'
    db.query(sql, loginParam.userName, (err, data) => {
        if (err) return res.msg(err)
        if (data.length !== 1) return res.msg('登陆失败！')
        let userInfo = data[0];
        //判断用户密码是否正确,bcrypt.compareSync(输入的密码明文, 数据库已加密的密码)
        if (!bcrypt.compareSync(loginParam.pwd, userInfo.pwd)) return res.msg('密码错误！');
        //密码成功，生成jwt的token,过期时间20分钟，通过ES6语法用空值覆盖userInfo的pwd和userPic原值
        let user = {...userInfo, pwd: '', userPic: '' }
        let tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.jwtExpiresIn })
        res.send({
            code: 1,
            msg: '登陆成功',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀 token: 'Bearer ' + tokenStr
            data: 'Bearer ' + tokenStr
        })
    })

}