import { requestResetToken, resetPassword } from "../services/reset-password.js"

export const requestResetEmailController = async (req, res) => {
    await requestResetToken(req.body.email);
    res.json({
        message: 'Reset password email was successfully sent!',
        status: 200,
        data: {},
    });
};

export const resetPasswordController = async (req, res) => {
    await resetPassword(req.body);
    res.json({
        message: 'Password was successfully reset!',
        status: 200,
        data: {},
    });
};