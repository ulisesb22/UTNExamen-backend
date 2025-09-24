import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.js';
import { AppError } from '../utils/AppError.js';

export function authMiddleware(req, _res, next) {
  const header = req.headers['authorization'] || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return next(new AppError('Token requerido', 401));
  try {
    const payload = jwt.verify(token, jwtConfig.secret);
    req.user = payload;
    next();
  } catch {
    next(new AppError('Token inválido o expirado', 403));
  }
}
