import { Router } from "express";
import { ctrlGetUser, ctrlCreateUser } from "../controllers/user.controllers.js";




const userRouter = Router();

userRouter.get('/',ctrlGetUser)
userRouter.post('/',ctrlCreateUser)



export {userRouter}