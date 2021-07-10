const db = require('../db/index')
const path = require('path')

//获取列表
exports.getList = (req, res) => {
    let sqlCount = `select count(*) count from crm_article a 
    inner join crm_articleCate b on a.cateId=b.uid
    inner join sys_user c on a.authorId=c.uid
    where a.isDelete=0`
    db.query(sqlCount, (err, data) => {
        if (err) return res.msg(err)
        if (data.length !== 1) return res.msg('查询失败！')
        let count = data[0].count
        let sql = `select 
        a.uid as uid,
        ifnull(c.nickName,c.userName) as author,
        a.title as title,
        b.name as cate,
        a.publishDate as pubDate,
        case  when a.status=1 then '已发布' else '草稿' end as status
        from crm_article a 
        inner join crm_articleCate b on a.cateId=b.uid
        inner join sys_user c on a.authorId=c.uid
        where a.isDelete=0`
        let param = []
        if (req.query.cateId) {
            sql += ' and a.cateId=? '
            param.push(req.query.cateId)
        }
        if (req.query.status || req.query.status === 0) {
            sql += ' and a.status=? '
            param.push(req.query.status)
        }
        sql += ' limit ?,? '
        param.push((req.query.pageNum - 1) * req.query.pageSize)
        param.push(req.query.pageSize)
        db.query(sql, param, (err, data) => {
            if (err) return res.msg(err)
            if (!data.length) return res.msg('暂无数据！')
            res.send({
                code: 1,
                msg: '查询成功！',
                data: {
                    count,
                    list: data
                }
            })
        })
    })
}

//删除文章
exports.deleteArticle = (req, res) => {
    let sql = 'update crm_article set isDelete=1 where uid=?'
    db.query(sql, req.body.uid, (err, data) => {
        if (err) return res.msg(err)
        if (data.affectedRows !== 1) return res.msg('删除失败！')
        res.msg('删除成功！', 1)
    })
}


//保存或发布文章
exports.saveArticle = (req, res) => {
    //判断是否上传了封面文件
    if (!req.file || req.file.fieldname !== 'cover_img') return res.msg('缺失封面，请上传封面图片！')
    let articleInfo = {
        ...req.body,
        coverUrl: path.join('/uploads', req.file.filename),
        createDate: new Date(),
        publishDate: new Date(),
        authorId: req.user.uid
    }
    let sql = 'insert into crm_article set ?'
    db.query(sql, articleInfo, (err, data) => {
        if (err) return res.msg(err)
        if (data.affectedRows !== 1) return res.msg('保存或发布失败！')
        res.msg('操作成功！', 1)
    })
}