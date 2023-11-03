import express from "express";
import { logRouter } from '../src/routes/log.routes.js';






const app = express();

//middlewares
app.use(express.json())
app.use('/log',logRouter)



const hostname = "localhost";
const port = 3000;
const route = '/log'

app.listen(port, () => {
  console.log(`Servidor escuchando en http://${hostname}:${port}${route}`);
});