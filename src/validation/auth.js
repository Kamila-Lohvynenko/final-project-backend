import Joi from "joi";

export const registerUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const updateDataUserSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    gender: Joi.string().valid('woman', 'man'),
    weight: Joi.number().min(0),
    activeSportTime: Joi.number().min(0),
    dailyNorma: Joi.number().min(0),
    avatar: Joi.string(), 
})

export const requestResetEmailSchema = Joi.object({
    email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
    password: Joi.string().required(),
    token: Joi.string().required(),
});

export const confirmOAuthSchema = Joi.object({
    code: Joi.string().required(),
});