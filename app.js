const express = require('express')
const app = express()
const joi = require('@hapi/joi')
const config = require('./config')
const expressJWT = require('express-jwt')

//处理跨域，使用cors注册全局中间件
const cors = require('cors')
app.use(cors())

//托管静态资源
app.use('/uploads', express.static('./uploads'))

//处理表单数据,application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
//处理 application/json数据
app.use(express.json())

//注册响应消息中间件
app.use((req, res, next) => {
    //默认code=0失败，方便响应失败消息
    res.msg = (err, code = 0) => {
        res.send({
            code,
            msg: err instanceof Error ? err.message : err
        })
    }
    next()
})

//jwt权限校验，除/api/auth下所有请求都会进行权限校验，注：静态文件托管要在此之前注册
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\/auth/] }))

//挂载路由
const authRouter = require('./router/auth')
app.use('/api/auth', authRouter)
const userRouter = require('./router/user')
app.use('/api/user', userRouter)
const articleCateRouter = require('./router/articleCate')
app.use('/api/articleCate', articleCateRouter)
const articleRouter = require('./router/article')
app.use('/api/article', articleRouter)

// 全局错误处理机制
app.use((err, req, res, next) => {
    //token解析失败
    if (err.name === 'UnauthorizedError') {
        return res.msg('身份认证失败！', 401)
    };
    // 数据验证失败 
    if (err instanceof joi.ValidationError) return res.msg(err);
    // 未知错误 
    res.msg(err)
})

//启动服务，监听3000端口
app.listen(3000, () => {
    console.log('server running at http://127.0.0.1:3000')
})