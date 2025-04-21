import bcrypt from "bcryptjs"; //Används för att jämföra lös
import { convertDbUserToDto } from "./registerController.mts";
import User from "../models/userSchema.mts";

//Asynkron function, tar emot mail och lös
export const login = async (email: string, password: string) => {
    // Försöker hitta en användare i databasen med den angivna e-post
    const foundUser = await User.findOne({ email: email});

    //Om den inte hittas, skickas ett error medd.
    if (!foundUser) {
        throw Error("Did not find user with email" + email);
    }

    //Jämför det inskickade lösenordet med det hashade lösenordet
    const success = await bcrypt.compare(password, foundUser.password);
    if (success) {
        return convertDbUserToDto(foundUser);
    } else {
        return null;
    }
};