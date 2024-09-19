export const setSessionCookies = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
    sameSite: 'None',
    secure: true,
  });
};
