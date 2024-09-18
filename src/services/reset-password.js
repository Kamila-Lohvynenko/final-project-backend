import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendMail.js';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMPLATES_DIR } from '../constans/index.js';

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
        link: `${process.env.APP_DOMAIN}/reset-password?token=${resetToken}`,
    });

  await sendEmail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Reset your password',
    html,
  });
};
