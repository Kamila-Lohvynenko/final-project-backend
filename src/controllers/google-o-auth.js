import { loginOrSignupWithGoogle } from '../services/google-o-auth.js';
import { generateAuthUrl } from '../utils/googleOAuth2.js';
import { THIRTY_DAYS } from '../constans/index.js';


const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
};


export const getOAuthUrlController = async (req, res) => {
    const url = generateAuthUrl();
    res.json({
        status: 200,
        message: 'Successfully get Google OAuth url!',
        data: {
            url,
        },
    });
}

export const confirmOAuthController = async (req, res) => {
    const session = await loginOrSignupWithGoogle(req.body.code);
    setupSession(res, session);

    res.json({
        status: 200,
        message: 'Successfully logged in via Google OAuth!',
        data: {
            accessToken: session.accessToken,
        },
    });  
}