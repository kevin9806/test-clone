import express from "express";
import { login } from "../controllers/loginController.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Läser in variabler från .env
dotenv.config();
// Skapar en ny router för login
export const loginRouter = express.Router();
// Hanterar POST anrop till login
loginRouter.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).send("Missing login information");

        }

        const loggedInUser = await login(email, password);
        // Om login misslyckas, skickas ett medd.

        if (!loggedInUser) {
            return res.status(400).json({ message: "Incorrect email/password" });
        }
        // Skapar en JWT-token, JWT_SECRET hämtas från .env
        const token = jwt.sign(loggedInUser, process.env.JWT_SECRET || "my-secret");
        // Sätter en tid för tokenet, en utgångstid på en timme.
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 1);

        // Lägger till tokenet i en cookie som skickas till klienten
        res.cookie("login", token, {
            expires: currentDate,
            httpOnly: false,
        });

        res.status(200).json(loggedInUser);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});