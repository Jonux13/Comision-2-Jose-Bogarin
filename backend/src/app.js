import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import "dotenv/config";
import { config } from "./settings/config.js";

import { logRouter } from '../src/routes/log.routes.js';
import { startConnecton } from "./settings/database.js";






const app = express();

//middlewares
app.use(express.json())
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use('/log',logRouter)



const hostname = "localhost";
// const port = 3000;
const route = '/user'

app.listen(config.PORT, async() => {
  await startConnecton()
  console.log(`Servidor escuchando en http://${hostname}:${config.PORT}${route}`);
});
