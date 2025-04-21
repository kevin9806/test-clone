import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

//const User = model("user", userSchema);
//Här kollar vi istället om modellen finns, och om återanvänd den.
const User = mongoose.models.user || model("user", userSchema);
export default User;