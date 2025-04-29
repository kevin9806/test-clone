import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { login } from '../controllers/loginController.mjs';
import { UserDto } from '../models/userDto.mjs';

dotenv.config();

export const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
     res.status(400).json({ message: 'Missing email or password' });
  }

  try {
    const user = await login(email, password);

    if (!user) {
     res.status(401).json({ message: 'Wrong email or password' });
    }

    const token = jwt.sign(user as UserDto, process.env.JWT_SECRET || 'my-secret', {
      expiresIn: '1h',
    });

    res.cookie('login', token, {
      httpOnly: true,
      maxAge: 3600000, 
    });

    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
