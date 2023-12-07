// middleware/auth.js

import { verifyJWT } from '../utils/jwt.js';
import { UserModel } from '../models/user.model.js';

export const validateToken = async (req, res, next) => {
  try {
      const token = req.headers.authorization;

      console.log('Token recibido:', token);

      if (!token) {
          console.error('Error: Token no proporcionado');
          return res.status(401).json({ error: 'Unauthorized', details: 'Token not provided' });
      }

      // Verifica el token
      const { userId } = await verifyJWT({ token });

      console.log('Token verificado, userId:', userId);

      // Busca el usuario en la base de datos
      const user = await UserModel.findOne({ _id: userId });

      console.log('Usuario encontrado:', user);

      if (!user) {
          console.error('Error: Usuario no encontrado');
          return res.status(401).json({ error: 'Unauthorized', details: 'Invalid token' });
      }

      // Asigna el usuario al objeto de solicitud
      req.user = user;

      console.log('Usuario asignado a req.user:', req.user);

      // Continúa con el siguiente middleware o ruta
      next();
  } catch (error) {
      console.error('Error al validar el token:', error);
      res.status(401).json({ error: 'Unauthorized', details: error.message, stack: error.stack });
  }
};
