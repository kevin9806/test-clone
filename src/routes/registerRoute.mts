import express from "express";
import { StringSchemaDefinition } from "mongoose";
import { createUser } from "../controllers/registerController.mts";

export const registerRouter = express.Router();


export type RegisterRequest = {
    name: string;
    email: string;
    password: string;
};

// Här försöker vi skapa en användare med datan som skickas in, req.body innehåller datan.
// Om det går bra, skickar vi tillbaka användaren som en DTO utan lösenord.
// Om inte, skickas ett error meddelande. 
registerRouter.post("/", async (req, res) => {
    try {
        const { name, email, password}: RegisterRequest = req.body;
        
        if (!name || !email || !password) {
            res.status(400).send("error");
        } else {
            const newUser = await createUser ({ name, email, password });
            res.status(200).json(newUser);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});