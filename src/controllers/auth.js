import { registerUser } from '../services/auth.js';
import { loginUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);
  res.json({
    status: 201,
    message: 'User registered successfully!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  await loginUser(req.body);
};
