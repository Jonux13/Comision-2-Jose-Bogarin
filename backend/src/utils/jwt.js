import jwt from 'jsonwebtoken';
import { config } from '../settings/config.js';

export const createJWT = async ({ userId }) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { userId },
      config.jwt_secret,
      (err, token) => {
        if (err) {
          console.error('Error al generar el token:', err);
          reject(err);
        } else {
          console.log('Token generado exitosamente:', token);
          resolve(token);
        }
      }
    );
  });
};

export const verifyJWT = async ({ token }) => {
  return new Promise((resolve, reject) => {
    // Eliminar el prefijo "Bearer" del token
    const tokenWithoutBearer = token.replace('Bearer ', '');

    console.log('Token a verificar:', tokenWithoutBearer);

    jwt.verify(tokenWithoutBearer, config.jwt_secret, (err, decoded) => {
      if (err || !decoded.userId) {
        console.error('Error al verificar el token:', err);
        reject('Invalid token');
      } else {
        console.log('Token verificado exitosamente:', decoded);
        resolve(decoded);
      }
    });
  });
};


