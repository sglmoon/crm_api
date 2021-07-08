const express = require('express')
const app = express()
const joi = require('@hapi/joi')

//处理跨域，使用cors注册全局中间件
const cors = require('cors')
app.use(cors())

//处理表单数据,application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

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

//挂载路由
const userRouter = require('./router/user.js')
app.use('/api/user', userRouter)

// 全局错误处理机制

app.use((err, req, res, next) => {
    //token解析失败
    if (err.name === 'UnauthorizedError') {
        return res.msg('无效的token')
    }

    // 数据验证失败 
    if (err instanceof joi.ValidationError) return res.msg(err)

    // 未知错误 
    res.msg(err)
})

//启动服务，监听3000端口
app.listen(3000, () => {
    console.log('server running at http://127.0.0.1:3000')
})