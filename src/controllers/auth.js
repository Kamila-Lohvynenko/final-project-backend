import { getCurrentUser, loginUser, logoutUser, refreshUsersSession, registerUser, updateDataUser } from "../services/auth.js"
import { THIRTY_DAYS } from '../constans/index.js'
import { setSessionCookies } from "../utils/setSessionCookies.js";
import createHttpError from "http-errors";

export const registerUserController = async (req, res) => {
    const user = await registerUser(req.body);
    res.status(201).json({
        status: 201,
        message: 'Successfully registered a user!',
        data: user,
    });
};

export const loginUserController = async (req, res) => {
    const {session, user} = await loginUser(req.body);

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });

    res.json({
        status: 200,
        message: 'Succesfully loged in an user!',
        data:{
            accsessToken: session.accessToken,
            user,
        },
    });
};

export const logoutUserController = async (req, res) => {
    if (req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId);
    }

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
    const session = await refreshUsersSession({
        sessionId: req.cookies.sessionId,
        refreshToken: req.cookies.refreshToken,
    });

    setSessionCookies(res, session);

    res.json({
        status: 200,
        message: 'Successfully refreshed a session!',
        data: {
            accessToken: session.accessToken,
        },
    });
};

export const getUserCurrentUserController = async (req, res,) => {

    const  userData = await getCurrentUser(req.user._id);

    res.status(200).json({
        status: 200,
        message: 'Successfully retrieved user information',
        data: userData,
    });
};

export const updateDataUserController = async (req, res,) => {
    const userId = req.user._id;
    const avatar = req.file;
    const payload = {
        ...req.body,
        avatar
    }
    const result = await updateDataUser(userId, payload);

    if (!result) {
        throw createHttpError(404, 'User not found');
    }

    res.json({
        status: 200,
        message: 'Successfully patched a user!',
        data: result.user,
    });

};

 