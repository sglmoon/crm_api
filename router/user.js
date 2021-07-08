const express = require('express')
const router = express.Router()

//导入路由处理模块，类似分层
const userHandler = require('../router_handler/userHnadler')

//导入表单验证中间件
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/userSchema')

// 注册新用户 
// 在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证 
// 数据验证通过后，会把这次请求流转给后面的路由处理函数 
// 数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行 处理
router.post('/regUser', expressJoi(reg_login_schema), userHandler.regUser)

//登录
router.post('/login', userHandler.login)

module.exports = router