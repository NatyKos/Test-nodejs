// src/server.js
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/env.js';
// ... Решта імпортів
import { getAllStudents, getStudentById } from './services/students.js';
const PORT = Number(env('PORT', '3000'));
// // const PORT = 3000;
// app.get('/', (req, res) => {
//   res.json({ message: 'Hello world!' });
// });
// app.get((req, res) => {
//   res.status(404).json({ message: 'Not Found' });
// });
//
// });
const startServer = () => {
  // ... Решта коду функції
  const logger = pino({ transport: { target: 'pino-pretty' } });

  const app = express();
  //   app.use(express.json());
  app.use(logger);
  app.use(cors());

  app.get('/students', async (req, res) => {
    const students = await getAllStudents();

    res.status(200).json({
      data: students,
    });
  });

  app.get('/students/:studentId', async (req, res) => {
    const { studentId } = req.params;
    const student = await getStudentById(studentId); // Відповідь, якщо контакт не знайдено
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
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  // ... Решта коду функції
};
export default startServer;
