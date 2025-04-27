import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserDto } from "../models/userDto.mjs";
import User from "../models/userSchema.mjs";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    //cookien för login innehåller krypterad information om användare.
    const loginCookie = req.cookies["login"];

    //Om cookien finns
    if (!loginCookie) {
        //Skicka tillbaka unauthorized
        res.status(401).end();
    } else {
        // Om cookien existerar, avkoda den -> resultat -> { name: "....", email: "....."} Fantastiskt!
        const result = jwt.decode(loginCookie);

        //Om resultat inte finns, skicka tillbaka unauthorized
        if (!result) {
            res.status(401).end();
        } else {
            // Om resultat finns, hitta användaren i databasen.
            const theUser: UserDto = result as UserDto;
            const userFromDb = await User.findOne({ email: theUser.email });

            // Om användaren existerar
            if (userFromDb) {
                // Gå till nästa middleware ->
                next();
            } else {
                // Annars skicka tillbaka detta, men hur testa min token?
                res.status(403).send("Din skojjare");
            }
        }
    }
};