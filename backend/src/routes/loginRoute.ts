import express from "express";
import { login } from "../controllers/loginController.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).send("Missing login information");

        }

        const loggedInUser = await login(email, password);
        

        if (!loggedInUser) {
            return res.status(400).json({ message: "Incorrect email/password" });
        }
        const token = jwt.sign(loggedInUser, process.env.JWT_SECRET || "my-secret");
       
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 1);

        
        res.cookie("login", token, {
            expires: currentDate,
            httpOnly: false,
        });

        res.status(200).json(loggedInUser);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});