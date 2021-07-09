const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const userHandeler = require('../router_handler/userHandler')
const { user_update_schema, user_updatePwd_schema, user_updateAvatar_schema } = require('../schema/userSchema')

router.get('/info', userHandeler.getUserInfo)
router.post('/update', expressJoi(user_update_schema), userHandeler.updateUserInfo)
router.post('/updatePwd', expressJoi(user_updatePwd_schema), userHandeler.updatePwd)
router.post('/updateAvatar', expressJoi(user_updateAvatar_schema), userHandeler.updateAvatar)


module.exports = router