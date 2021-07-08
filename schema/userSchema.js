const joi = require('@hapi/joi')

/*
 * string() 值必须是字符串 
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串 
 * min(length) 最小长度 
 * max(length) 最大长度 
 * required() 值是必填项，不能为 undefined 
 * pattern(正则表达式) 值必须符合正则表达式的规则 
 */

//用户名校验规则
const userName = joi.string().alphanum().min(3).max(18).required()

//密码校验规则
const pwd = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required()

//向外导出注册和登录的校验规则对象
exports.reg_login_schema = {
    //设置body属性，注册@escook/express-joi中间件时会自动对req.body中的数据进行验证
    body: {
        userName,
        pwd
    }
}