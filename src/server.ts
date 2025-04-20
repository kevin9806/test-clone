import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import { registerRouter } from "./routes/registerRoute.mts";

dotenv.config();


const app = express();
app.use(express.json());

app.use('/register', registerRouter);


app.listen(3000, () => {
    console.log("Server is up and running");
});

