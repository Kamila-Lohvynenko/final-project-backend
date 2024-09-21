import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';

import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constans/index.js';
import { SessionsCollection } from '../db/models/session.js';

import { createSession } from '../utils/createSession.js';

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

  await SessionsCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  const session = await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });

  return {
    session,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      weight: user.weight,
      activeSportTime: user.activeSportTime,
      dailyNorma: user.dailyNorma,
      avatar: user.avatar,
    },
  };
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
    throw createHttpError(404, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const getCurrentUser = async (userId) => {
  const user = await UsersCollection.findById(userId).exec();

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const {
    _id,
    name,
    email,
    dailyNorma,
    gender,
    weight,
    activeSportTime,
    avatar,
  } = user;

  return {
    _id,
    name: name || 'User',
    email,
    gender,
    dailyNorma: dailyNorma || 1.5,
    weight,
    activeSportTime,
    avatar,
  };
};

export const updateDataUser = async (userId, payload, options = {}) => {
  const result = await UsersCollection.findOneAndUpdate(
    { _id: userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!result || !result.value) return null;

  return {
    user: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};

export const getUsersCount = async () => {

const count = await UsersCollection.countDocuments();
return count;
};