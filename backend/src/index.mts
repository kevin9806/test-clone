import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { createServer } from 'node:http';

import { registerRouter } from './routes/registerRoute.mjs';
import { loginRouter } from './routes/loginRoute.mjs';
import { secretRouter } from './routes/secretRoute.mjs';
import { auth } from './middleware/authMiddleware.mjs';

dotenv.config();

const app = express();
const server = createServer(app);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('No URI in .env');
}

// Middleware
app.use(express.json());
app.use(cookieParser());

// Live check
app.get('/ping', (_, res): void => {
    res.status(200).send('works');
  });

// Public routes
app.use('/register', registerRouter);
app.use('/login', loginRouter);

// Protected routes
app.use(auth);
app.use('/secret', secretRouter);

// Start server
server.listen(PORT, () => {
    mongoose.connect(MONGO_URI)
    console.log(`Server running on port ${PORT}`);
}); 
