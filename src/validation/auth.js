import Joi from "joi";

export const registerUserScheme = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})