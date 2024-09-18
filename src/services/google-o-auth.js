import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import { validateCode,
     getFullNameFromGoogleTokenPayload } from '../utils/googleOAuth2.js';
import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';
import {FIFTEEN_MINUTES, THIRTY_DAYS} from '../constans/index.js';

const createSession = () => {
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');
    
    return {
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
    };
};

export const loginOrSignupWithGoogle = async (code) => {
    const loginTicket = await validateCode(code);
    const payload = loginTicket.getPayload();
    if (!payload) throw createHttpError(401);

    let user = await UsersCollection.findOne({
        email: payload.email
    });
    if (!user) {
        const password = await bcrypt.hash(randomBytes(10), 10);
        user = await UsersCollection.create({
            email: payload.email,
            name: getFullNameFromGoogleTokenPayload(payload),
            password,
        });
    }

    const newSession = createSession();
    return await SessionsCollection.create({
        userId: user._id,
        ...newSession,
    });
};
