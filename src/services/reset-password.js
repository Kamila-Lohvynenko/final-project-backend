import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendMail.js';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMPLATES_DIR } from '../constans/index.js';

import bcrypt from 'bcrypt';

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
      expiresIn: '5m',
    },
    );
    
    const resetPasswordTemplatePath = path.join(TEMPLATES_DIR, 'reset-password-email.html',);

    const templateSource = (await fs.readFile(resetPasswordTemplatePath)).toString();

    const template = handlebars.compile(templateSource);

    const html = template({
        name: user.name,
        link: `${process.env.APP_FRONTEND}/reset-password?token=${resetToken}`,
    });

  await sendEmail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Reset your password',
    html,
  });
};

export const resetPassword = async (payload) => {
    let entries;

    try {
        entries = jwt.verify(payload.token, process.env.JWT_SECRET);
    } catch (err) {
        if (err instanceof Error) throw createHttpError(401, err.message);
        throw err;
    }

    const user = await UsersCollection.findOne({
        email: entries.email,
        _id: entries.sub,
    });

    if (!user) {
        throw createHttpError(404, 'User not found');
    }

    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    await UsersCollection.updateOne(
        { _id: user._id },
        { password: encryptedPassword },
    );
};
