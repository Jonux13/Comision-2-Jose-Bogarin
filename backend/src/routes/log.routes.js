import { Router } from "express";
import { ctrlGetUser, ctrlCreateUser } from "../controllers/user.controllers.js";




const logRouter = Router();

logRouter.get('/',ctrlGetUser)
logRouter.post('/',ctrlCreateUser)



export {logRouter}