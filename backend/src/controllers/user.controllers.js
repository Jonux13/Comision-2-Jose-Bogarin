import { UserModel } from "../models/user.model.js"

export const ctrlGetUser = (req, res) =>
res.status(200).send("Hola desde el GET")



export const ctrlCreateUser = (req, res) =>
res.status(201).send('Hello from POST verb')