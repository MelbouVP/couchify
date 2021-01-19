const Joi = require('joi')

const schema = Joi.object({
    username: Joi.string().min(6).max(100).required(),
    email: Joi.string().email({ minDomainSegments: 2}).required(),
    password: Joi.string().min(8).required(),
    confirm: Joi.ref('password')
})

module.exports = {
    schema
}