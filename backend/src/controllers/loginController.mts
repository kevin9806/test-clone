import bcrypt from 'bcryptjs';

import User from '../models/userSchema.mjs';
import { convertDbUserToDto } from './registerController.mjs';

export const login = async (email: string, password: string) => {
  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    throw new Error(`User not found with email: ${email}`);
  }

  const passwordMatch = await bcrypt.compare(password, foundUser.password);

  return passwordMatch ? convertDbUserToDto(foundUser) : null;
};
