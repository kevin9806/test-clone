import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import { registerRouter } from "./routes/registerRoute.mts";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Fixa __dirname i ES-moduler, varför? Dubbelkolla detta.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Den hittar inte env filen om jag inte gör såhär.
dotenv.config({ path: path.resolve(__dirname, "../.env") });



const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

app.use(express.json());

app.use('/register', registerRouter);

if (!mongoUri) {
    console.error("Ingen url i env");
    process.exit(1);
}

app.listen(port, async () => {
    await mongoose.connect(mongoUri);
    console.log("Api is up and running, connected to database");
  });

