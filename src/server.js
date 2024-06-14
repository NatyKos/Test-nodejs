import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/env.js';
import { getAllStudents, getStudentById } from './services/students.js';
const PORT = Number(env('PORT', '3000'));

const startServer = () => {
  const logger = pino({ transport: { target: 'pino-pretty' } });

  const app = express();
  app.use(logger);
  app.use(cors());

  app.get('/students', async (req, res) => {
    const students = await getAllStudents();

    res.status(200).json({
      data: students,
    });
  });

  app.get('/students/:studentId', async (req, res, next) => {
    const { studentId } = req.params;
      const student = await getStudentById(studentId);
      // Відповідь, якщо контакт не знайдено
    if (!student) {
      res.status(404).json({
        message: 'Student not found',
      });
      return;
    }

    // Відповідь, якщо контакт знайдено
    res.status(200).json({
      data: student,
    });
    next();
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
export default startServer;
