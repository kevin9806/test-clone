import User from "../models/userSchema.mjs";
import { InferSchemaType } from "mongoose";
import { UserDto } from "../models/userDto.mts";
import { RegisterRequest } from "../routes/registerRoute.mts";
import bcrypt from "bcryptjs";

// Typ för användaren för att använda vårt schema

type UserType = InferSchemaType<typeof User.schema>;

// Konvertering, konverterar databas-användare till DTO utan lösenord.

export const convertDbUserToDto = (dbUser: UserType): UserDto => {
    return {
        username: dbUser.name,
        email: dbUser.email,
    } satisfies UserDto;
};

// Funktion för att skapa ny användare

export const createUser = async (data: RegisterRequest) => {
    //Kolla om användaren finns
    const existingUser = await User.findOne({ email: data.email });

    // Om användare finns, skicka ett error.
    if (existingUser) {
        throw Error("User with email" + data.email + "already exists");
    }

    //Kryptering av lösenord
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);

    //Skapar ny användare i databasen
    const newUser = await User.create({
        name: data.name,
        email: data.email,
        password: hash,
    });

    // Returnera DTO
    return convertDbUserToDto(newUser);
};





