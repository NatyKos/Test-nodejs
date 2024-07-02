import { Router } from 'express';
import {
  getStudentByIdController,
  getStudentsController,
  createStudentController,
  deleteStudentController,
  upsertStudentController,
  patchStudetnController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';
import isValidId from '../middlewares/isValidId.js';

const studentsRouter = Router();
studentsRouter.get('/', ctrlWrapper(getStudentsController));
studentsRouter.get(
  '/:studentId',
  isValidId,
  ctrlWrapper(getStudentByIdController),
);
studentsRouter.post(
  '/',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);
studentsRouter.delete('/:studentId', ctrlWrapper(deleteStudentController));
studentsRouter.put(
  '/:studentId',
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);
studentsRouter.patch(
  '/:studentId',
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudetnController),
);

export default studentsRouter;
