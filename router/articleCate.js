const express = require('express')
const router = express.Router()
const articleCateHandler = require('../router_handler/articleCateHandler')
const { artCate_add_schema, artCate_info_schema, artCate_update_schema } = require('../schema/articleCateSchema')
const expressJoi = require('@escook/express-joi')

router.get('/getList', articleCateHandler.getList)
router.post('/add', expressJoi(artCate_add_schema), articleCateHandler.addCate)
router.get('/info', expressJoi(artCate_info_schema), articleCateHandler.getCateInfo)
router.post('/update', expressJoi(artCate_update_schema), articleCateHandler.updateCate)
router.post('/delete', articleCateHandler.deleteCate)

module.exports = router