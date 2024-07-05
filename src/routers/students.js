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
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const studentsRouter = Router();
studentsRouter.use(authenticate);
studentsRouter.get(
  '/',
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(getStudentsController),
);
studentsRouter.get(
  '/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(getStudentByIdController),
);
studentsRouter.post(
  '/',
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);
studentsRouter.delete(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(deleteStudentController),
);
studentsRouter.put(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);
studentsRouter.patch(
  '/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudetnController),
);

export default studentsRouter;
