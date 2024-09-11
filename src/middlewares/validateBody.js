import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    const result = await schema.validateAsync(req.body, { abortEarly: false });
    console.log({ result });

    next();
  } catch (error) {
    next(createHttpError(400, 'Bad request', { errors: error.details }));
  }
};
