import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendMail.js';

export const requestResetToken = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: '15m',
    },
  );

  await sendEmail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetToken}">here</a> to reset your password!</p>`,
  });
};
