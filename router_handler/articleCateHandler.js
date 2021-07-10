const db = require('../db/index')

//获取文章分类列表
exports.getList = (req, res) => {
    let sql = 'select uid,name,createDate from crm_articleCate where isDelete=0 order by sort asc'
    db.query(sql, (err, data) => {
        if (err) return res.msg('查询异常！')
        if (data.length <= 0) return res.msg('暂无数据！')
        res.send({
            code: 1,
            msg: '查询成功！',
            data: data
        })
    })
}

//新增分类
exports.addCate = (req, res) => {
    //判断类型是否已存在
    let sql = 'select 1 from crm_articleCate where name=?'
    db.query(sql, req.body.name, (err, data) => {
        if (err) res.msg(err)
        if (data.length > 0) return res.msg('该类型已存在，请勿重复添加！')
        let sql2 = 'insert into crm_articleCate set ?'
        let cateInfo = {...req.body, parentId: 1, createDate: new Date() }
        db.query(sql2, cateInfo, (err, data) => {
            if (err) return res.msg(err)
            if (data.affectedRows !== 1) return res.msg('文章分类新增失败！')
            res.msg('添加成功！', 1)
        })
    })
}

//根据ID获取分类信息
exports.getCateInfo = (req, res) => {
    let uid = req.query.uid
    let sql = 'select uid,name,sort from crm_articleCate where uid=?'
    db.query(sql, uid, (err, data) => {
        if (err) return res.msg(err)
        if (data.length !== 1) return res.msg('获取分类信息失败！')
        res.send({
            code: 1,
            msg: '获取成功！',
            data: data[0]
        })
    })
}

//更新分类信息
exports.updateCate = (req, res) => {
    //查询分类是否被占用
    let sql = 'select 1 from crm_articleCate where uid<>? and name=?'
    db.query(sql, [req.body.uid, req.body.name], (err, data) => {
        if (err) return res.msg(err)
        if (data.length > 0) return res.msg('改分类名称已存在，请更换名称！')
        let sql2 = 'update crm_articleCate set ? where uid=?'
        db.query(sql2, [req.body, req.body.uid], (err, data) => {
            if (err) return res.msg(err)
            if (data.affectedRows !== 1) return res.msg('修改失败！')
            res.msg('修改成功！', 1)
        })
    })
}

//删除文章，软删除，打标记
exports.deleteCate = (req, res) => {
    let sql = 'update crm_articleCate set isDelete=1 where uid=?'
    db.query(sql, req.body.uid, (err, data) => {
        if (err) return res.msg(err)
        if (data.affectedRows !== 1) return res.msg('删除失败！')
        res.msg('删除成功！', 1)
    })
}