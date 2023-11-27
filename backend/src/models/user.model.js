import { Schema, model } from "mongoose";


// Define el esquema del usuario utilizando la clase Schema de mongoose.
const userSchema = new Schema({
    // Campo 'username' de tipo String, único, obligatorio, con longitud mínima de 3 y máxima de 20 caracteres.
    username:{
        type: String,
        unique: true,
        required: true,
        maxLegnth: 20,
        minLength: 3
    },
     // Campo 'email' de tipo String, único y obligatorio.
    email:{
        type: String,
        unique: true,
        required: true
    },
     // Campo 'pasword' de tipo String y obligatorio.
    password:{
        type: String,
        required: true
    }
});

export const UserModel = model("user", userSchema);

