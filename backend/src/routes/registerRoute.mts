import express from 'express';
import { createUser } from '../controllers/registerController.mjs';

export const registerRouter = express.Router();

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

registerRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body as RegisterRequest;

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Fill out all forms' });
  }

  try {
    const newUser = await createUser({ name, email, password });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
