import { Schema, model } from "mongoose";


const userSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true,
        maxLegnth: 20,
        minLength: 3
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    pasword:{
        type: String,
        required: true
    }
});

export const UserModel = model("user", userSchema);

