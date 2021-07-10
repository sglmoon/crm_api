const joi = require('@hapi/joi')

const name = joi.string().required()
const sort = joi.number().min(1).max(999).required()
const uid = joi.number().min(1).required()

exports.artCate_add_schema = {
    body: {
        name,
        sort
    }
}

exports.artCate_info_schema = {
    query: {
        uid
    }
}

exports.artCate_update_schema = {
    body: {
        uid,
        name,
        sort
    }
}