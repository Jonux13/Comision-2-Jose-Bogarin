import { Router } from "express";
import { ctrlCreateUser, ctrlGetUserById, ctrlGetAllUsers } from "../controllers/user.controllers.js";



// Crea una instancia de Router para gestionar las rutas relacionadas con los usuarios.
const userRouter = Router();


// Ruta GET para obtener todos los usuarios.
userRouter.get('/',ctrlGetAllUsers)
// Ruta POST para crear un nuevo usuario.
userRouter.post('/',ctrlCreateUser)
// Ruta GET para obtener un usuario por su ID.
userRouter.get('/:userId',ctrlGetUserById)




export {userRouter}