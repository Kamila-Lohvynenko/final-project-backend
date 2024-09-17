import { requestResetToken } from "../services/reset-password.js"

export const requestResetEmailController = async (req, res) => {
    await requestResetToken(req.body.email);
    res.json({
        message: 'Reset password email was successfully sent!',
        status: 200,
        data: {},
    });
};

export const resetPasswordComtroller = async (req, res, next) => {
    
}