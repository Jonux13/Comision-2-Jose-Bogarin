import { Router } from "express";
import { ctrlCreateLog, ctrlGetLog } from "../controllers/log.controllers.js";


const logRouter = Router();

logRouter.get('/log',ctrlGetLog)
logRouter.post('/log',ctrlCreateLog)



export {logRouter}