import { UserModel } from "../models/user.model.js"

export const ctrlGetLog = (req, res) =>
res.status(200).send("Hola desde el GET")



export const ctrlCreateLog = (req, res) =>
res.status(201).send('Hello from POST verb')