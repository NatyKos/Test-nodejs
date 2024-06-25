import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(createHttpError(404, 'Id not found'));
  }

  next();
};
export default isValidId;
