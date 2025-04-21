import express, { Router } from "express";

// Skapar en ny "hemlig" router. 
export const secretRouter = express.Router();
// Hanterar get requests, fungerar det?
secretRouter.get("/", async (req, res) => {
    res.status(200).json({ message: "Största hemligheten i ett api" });
});
