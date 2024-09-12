import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (idName) => (req, res, next) => {
  const id = req.params[idName];

  if (!id) {
    throw new Error('ID name is wrong');
  }
  if (!isValidObjectId(id)) {
    return next(createHttpError(400, 'Invalid contact id'));
  }
  return next();
};
