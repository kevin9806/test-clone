import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import User from '../models/userSchema.mjs';
import { UserDto } from '../models/userDto.mjs';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.login;

    if (!token) {
      res.status(401).json({ message: 'no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'my-secret') as UserDto;

    const userFromDb = await User.findOne({ email: decoded.email });

    if (!userFromDb) {
      res.status(403).json({ message: 'user not found' });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: 'bad or expired token' });
    
  }
};
