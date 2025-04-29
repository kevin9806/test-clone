import express from 'express';

export const secretRouter = express.Router();

secretRouter.get('/', async (_req, res) => {
  res.status(200).json({ message: 'This is a protected secret API!' });
});
