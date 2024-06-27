import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

const isValidId = (req, res, next) => {
  const { studentId } = req.params;
  if (!isValidObjectId(studentId)) {
    next(createHttpError(404, `${studentId} not valid id`));
  }
  next();
};
export default isValidId;
