import {
  getCurrentUser,
  getUsersCount,
  loginUser,
  logoutUser,
  refreshUsersSession,
  registerUser,
  updateDataUser,
} from '../services/auth.js';
import { setSessionCookies } from '../utils/setSessionCookies.js';
import createHttpError from 'http-errors';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import { uploadToCloudinary } from './../utils/uploadToCloudinary.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const { session, user } = await loginUser(req.body);

  setSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Succesfully loged in an user!',
    data: {
      accessToken: session.accessToken,
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

export const getUserCurrentUserController = async (req, res) => {
  const userData = await getCurrentUser(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved user information',
    data: userData,
  });
};

export const updateDataUserController = async (req, res) => {
  const userId = req.user._id;
  const avatar = req.file;

  let photo;

  if (typeof avatar !== 'undefined') {
    if (process.env.ENABLE_CLOUDINARY === 'true') {
      const result = await uploadToCloudinary(req.file.path);
      await fs.unlink(req.file.path);

      photo = result.secure_url;
    } else {
      await fs.rename(
        req.file.path,
        path.resolve('src', 'public', 'userAvatars', req.file.filename),
      );
      photo = `${process.env.APP_DOMAIN}/contactAvatars/${req.file.filename}`;
    }
  }
  const payload = { ...req.body, avatar: photo };

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

export const getUserCountController = async (req, res) => {
  const totalUsers = await getUsersCount();

  res.status(200).json({
    status: 200,
    message: 'Successfully got total number of registered users!',
    data: totalUsers, 
  });
};