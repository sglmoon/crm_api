const db = require('../db/index')
const bcrypt = require('bcryptjs')

exports.getUserInfo = (req, res) => {
    let sql = 'select uid,userName,nickName,phone,email,userPic from sys_user where uid=?'
    db.query(sql, req.user.uid, (err, data) => {
        if (err) return res.msg(err)
        if (data.length !== 1) return res.msg('用户信息获取失败！')
        res.send({
            code: 1,
            msg: '用户信息获取成功！',
            data: data[0]
        })
    })
}

exports.updateUserInfo = (req, res) => {
    let sql = 'update sys_user set ? where uid=?'
    db.query(sql, [req.body, req.body.uid], (err, data) => {
        if (err) return res.msg(err)
        if (data.affectedRows !== 1) return res.msg('用户信息更新失败！')
        res.msg('更新成功', 1)
    })
}

exports.updatePwd = (req, res) => {
    let sql1 = 'select pwd from sys_user where uid=?'
    db.query(sql1, req.user.uid, (err, data) => {
        if (err || data.length !== 1) return res.msg('用户不存在！');
        //校验原密码是否正确
        if (!bcrypt.compareSync(req.body.pwd, data[0].pwd)) return res.msg('原密码不正确')
        let newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        let sql2 = 'update sys_user set pwd=? where uid=?'
        db.query(sql2, [newPwd, req.user.uid], (err, data) => {
            if (err) return req.msg(err)
            if (data.affectedRows !== 1) return res.msg('密码更新失败！')
            res.msg('密码修改成功！', 1)
        })
    })
}

exports.updateAvatar = (req, res) => {
    let sql = 'update sys_user set userPic=? where uid=?'
    db.query(sql, [req.body.avatar, req.user.uid], (err, data) => {
        if (err) return res.msg(err)
        if (data.affectedRows !== 1) return res.msg('更新图像失败！')
        res.msg('图像更新成功', 1)
    })
}