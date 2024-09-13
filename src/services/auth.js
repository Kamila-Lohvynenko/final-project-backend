import createHttpError from "http-errors";
import { UsersCollection } from "../db/models/user.js";
import bcrypt from 'bcrypt';

import { randomBytes } from 'crypto';
import {FIFTEEN_MINUTES, THIRTY_DAYS} from '../constans/index.js';
import {SessionsCollection} from '../db/models/session.js'

import { createSession } from '../utils/createSession.js'

export const registerUser = async (payload) => {
    const user = await UsersCollection.findOne({ email: payload.email });
    if (user) throw createHttpError(409, 'Email in use');
    
    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    
    return await UsersCollection.create({
        ...payload,
        password: encryptedPassword,
    });

};

export const loginUser = async (payload) => {
    const user = await UsersCollection.findOne({ email: payload.email });
    if (!user) {
        throw createHttpError(404, 'User not found');
    }

    const isEqual = await bcrypt.compare(payload.password, user.password);

    if (!isEqual) {
        throw createHttpError(401, 'Unauthorized');
    }

    await SessionsCollection.deleteOne({userId: user._id});

    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');

    return await SessionsCollection.create({
        userId: user._id,
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),

    });
};

export const logoutUser = async (sessionId) => {
    await SessionsCollection.deleteOne({ _id: sessionId });
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
    const session = await SessionsCollection.findOne({
        _id: sessionId,
        refreshToken,
    });

    if (!session) {
        throw createHttpError(401, 'Session not found');
    }

    const isSessionTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);

    if (isSessionTokenExpired) {
        throw createHttpError(401, 'Session token expired');

    }

    const newSession = createSession();

    await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

    return await SessionsCollection.create({
        userId: session.userId,
        ...newSession
    });
};


export const getCurrentUser = async (userId) => {
    const user = await UsersCollection.findById(userId).exec();

    if (!user) {
        throw createHttpError(404, 'User not found');
    }

    const { _id, name, email, dailyNorma } = user;

    return {
        _id,
        name: name || 'User',
        email,
        dailyNorma: dailyNorma || 1.5,
    };
};