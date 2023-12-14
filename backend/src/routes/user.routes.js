import { Router } from "express";
import {
  ctrlCreateUser,
  ctrlLoginUser,
  getUserById,
} from "../controllers/user.controllers.js";

// Crea una instancia de Router para gestionar las rutas relacionadas con los usuarios.
const userRouter = Router();

// Ruta POST para crear (registrar) un nuevo usuario.
userRouter.post("/register", ctrlCreateUser);

// Ruta POST para logear un usuario.
userRouter.post("/login", ctrlLoginUser);

userRouter.get("/:userId", getUserById);

export { userRouter };
