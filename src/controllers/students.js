import {
  getAllStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
} from '../services/students.js';
import createHttpError from 'http-errors';

export const getStudentsController = async (req, res) => {
  const students = await getAllStudents();
  res.json({
    status: 200,
    message: 'Successfully found students!',
    data: students,
  });
};

export const getStudentByIdController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);

  // Відповідь, якщо контакт не знайдено
  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  // Відповідь, якщо контакт знайдено
  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};
// створення нового студента
export const createStudentController = async (req, res) => {
  const student = await createStudent(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a student!',
    data: student,
  });
};
// видалення студента
export const deleteStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await deleteStudent(studentId);
  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  res.status(204).send();
};

// оновлення студента
export const upsertStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const result = await updateStudent(studentId, req.body, { upsert: true });
  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: 'Successfully upserted a student!',
    data: result.student,
  });
};

// оновлення деяких даних студента
export const patchStudetnController = async (req, res, next) => {
  const { studentId } = req.params;
  const result = await updateStudent(studentId, req.body);
  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  res.json({
    status: 200,
    me: 'Successfully patched a student!',
    data: result.student,
  });
};
