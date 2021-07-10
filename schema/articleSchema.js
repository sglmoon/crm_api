const joi = require('@hapi/joi')

const uid = joi.number().min(1).required()
const title = joi.string().required()
const cateId = joi.number().required()
const status = joi.number().required()
const content = joi.string().required().allow('')

const pageNum = joi.number().min(1).required()
const pageSize = joi.number().min(1).required()

exports.article_save_schema = {
    body: {
        title,
        cateId,
        status,
        content
    }
}

exports.article_list_schema = {
    query: {
        pageNum,
        pageSize,
        status: joi.allow('').concat(status),
        cateId: joi.allow('').concat(cateId)
    }
}

exports.article_delete_schema = {
    body: {
        uid
    }
}