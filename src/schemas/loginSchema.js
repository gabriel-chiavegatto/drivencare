import joi from "joi";

export const loginSchema = joi.object({
    type: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
})