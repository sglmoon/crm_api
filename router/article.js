const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const path = require('path')
const multer = require('multer')
const articleHandler = require('../router_handler/articleHandler')
const { article_save_schema, article_list_schema, article_delete_schema } = require('../schema/articleSchema')

//导入multer，解析 multipart/form-data 数据
// file文件存放在req.file，其余字段存放在 req.body中
// 创建multer示例对象，指定文件服务器本地存放路径
// const upload = multer({ dest: path.join(__dirname, '../uploads') });//multer默认没有后缀名
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '.jpg')
    }
})

var upload = multer({ storage: storage })

// upload.single() 局部中间件，解析ultipart/form-data 数据
// file文件类型数据挂载到req.file，其余非文件类型字段挂载到 req.body中

router.post('/save', upload.single('cover_img'), expressJoi(article_save_schema), articleHandler.saveArticle)
router.get('/getList', expressJoi(article_list_schema), articleHandler.getList)
router.post('/delete', expressJoi(article_delete_schema), articleHandler.deleteArticle)

module.exports = router