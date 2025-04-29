import bcrypt from 'bcryptjs';
import User from '../models/userSchema.mjs';

import { InferSchemaType } from 'mongoose';
import { UserDto } from '../models/userDto.mjs';
import { RegisterRequest } from '../routes/registerRoute.mjs';


type UserType = InferSchemaType<typeof User.schema>;

export const convertDbUserToDto = (dbUser: UserType): UserDto => {
  return {
    username: dbUser.name,
    email: dbUser.email,
  };
};

export const createUser = async (data: RegisterRequest): Promise<UserDto> => {
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new Error(`User with email ${data.email} already exists`);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const newUser = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  return convertDbUserToDto(newUser);
};
