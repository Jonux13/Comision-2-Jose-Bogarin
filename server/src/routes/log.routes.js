import { Router } from "express";
import { ctrlCreateLog, ctrlGetLog } from "../controllers/log.controllers.js";




const logRouter = Router();

logRouter.get('/',ctrlGetLog)
logRouter.post('/',ctrlCreateLog)



export {logRouter}