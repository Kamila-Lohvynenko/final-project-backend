import { isHttpError } from 'http-errors';
// eslint-disable-next-line no-unused-vars
export const errorMiddleware = (err, req, res, next) => {
  if (isHttpError(err)) {
    res.status(err.status).send({
      status: err.status,
      message: err.message,
      validationErrors: err.errors
        ? err.errors.map((err) => err.message).join(', ')
        : undefined,
    });
  }
  console.error(err);

  res.status(500).send({
    status: 500,
    message: 'Something went wrong',
    data: 'Internal serves error',
  });
};
