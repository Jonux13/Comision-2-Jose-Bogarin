import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import "dotenv/config";
import { config } from "./settings/config.js";

import { userRouter } from './routes/user.routes.js';
import { startConnecton } from "./settings/database.js";



const app = express();

//middlewares
app.use(express.json())
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());



// Rutas
app.use('/user', userRouter);


const hostname = "localhost";
const route = '/user'


// Inicia el servidor escuchando en el puerto especificado en la configuración.
app.listen(config.PORT, async() => {
  await startConnecton()
  console.log(`Servidor escuchando en http://${hostname}:${config.PORT}${route}`);
});
