const Joi = require('joi')

// schema for user's register data validation
// min/max indicates character amount
// minDomainSegments refers to formating
// ref uses same validation principles as specified parameter
const schema = Joi.object({
    username: Joi.string().min(6).max(100).required(),
    email: Joi.string().email({ minDomainSegments: 2}).required(),
    password: Joi.string().min(8).required(),
    confirm: Joi.ref('password')
})

module.exports = {
    schema
}