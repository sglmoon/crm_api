基于NodeJS实现的crm接口服务
项目技术栈：
框架: express@4.17.1
数据库：mysql@2.18.1
密码加密: bcryptjs@2.4.3
表单校验: @hapi/joi@17.1.0 @escook/express-joi@1.0.0
身份认证: jsonwebtoken express-jwt


接口响应数据结构：json对象格式
code: 1成功，0失败
msg: 提示信息
data: 数据