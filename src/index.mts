import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { registerRouter } from "./routes/registerRoute.mts";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { loginRouter } from "./routes/loginRoute.mts";
import { secretRouter } from './routes/secretRoute.mts';
import { auth } from './middleware/authMiddleware'; 

// Fixa __dirname i ES-moduler, varför? Dubbelkolla detta.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Den hittar inte env filen om jag inte gör såhär.
dotenv.config({ path: path.resolve(__dirname, "../.env") });



const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

app.use(express.json());

app.use(cookieParser());

app.use('/register', registerRouter);
app.use("/login", loginRouter);
app.use("/secret", secretRouter);

app.use(auth);
// Hit kommer jag bara om jag är inloggad
app.use("/secret", secretRouter);

if (!mongoUri) {
    console.error("Ingen url i env!");
    process.exit(1);
}

app.listen(port, async () => {
    await mongoose.connect(mongoUri);
    console.log("Api is up and running, connected to database");
  });

