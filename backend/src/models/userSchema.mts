import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const { models } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = models.user || model('user', userSchema);
export default User;
