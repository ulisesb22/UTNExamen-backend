import { AppError } from '../utils/AppError.js';

export function roleMiddleware(...rolesPermitidos) {
  const set = new Set(rolesPermitidos.flat());
  return (req, _res, next) => {
    const rol = req.user?.rol;
    if (!rol || !set.has(rol)) return next(new AppError('Acceso denegado', 403));
    next();
  };
}
