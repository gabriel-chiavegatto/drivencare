import joi from 'joi'

export const userSchema = joi.object({
    type: joi.string().required(),
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    crm: joi.string(),
    cpf: joi.string(),
    phone: joi.string(),
    locale: joi.string()
});