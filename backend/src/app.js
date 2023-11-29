import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';
import { config } from './settings/config.js';
import { userRouter } from './routes/user.routes.js';
import { postRouter } from './routes/post.routes.js';
import { startConnecton } from './settings/database.js';

const app = express();

// Middleware para configuraciones generales
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

// Inicia el servidor escuchando en el puerto especificado en la configuración.
app.listen(config.PORT, async () => {
  await startConnecton();
  console.log(`Servidor escuchando en http://localhost:${config.PORT}`);
});
