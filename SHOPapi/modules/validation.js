const Joi = require('@hapi/joi')

const validationReg = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        kommentar: Joi.string()
    });
    return schema.validate(data)
}

const validationLogin = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data)
}

module.exports = validationReg;
module.exports = validationLogin;