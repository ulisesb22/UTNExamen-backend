import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { bcryptConfig } from '../config/bcrypt.js';
import { jwtConfig } from '../config/jwt.js';
import { usuarioRepo } from '../repositories/usuarioRepo.js';
import { rolRepo } from '../repositories/rolRepo.js';
import { AppError } from '../utils/AppError.js';
import { ROLES } from '../utils/constants.js';

export const usuarioService = {
  async register({ nombre, contraseña }) {
    if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{3,}$/.test(nombre || '')) throw new AppError('Nombre inválido');
    if (!contraseña || contraseña.length < 6) throw new AppError('Contraseña muy corta (mínimo 6)');
    const existing = await usuarioRepo.findByName(nombre);
    if (existing) throw new AppError('Usuario ya existe', 409);
    const rol = await rolRepo.getByName(ROLES.USER_COMUN);
    const hash = await bcrypt.hash(contraseña, bcryptConfig.rounds);
    const id = await usuarioRepo.create({ nombre, contraseña: hash, id_rol: rol?.id_rol });
    return { id_usuario: id, nombre, rol: rol?.nombre_rol };
  },

  async login({ nombre, contraseña }) {
    const user = await usuarioRepo.findByName(nombre);
    if (!user) throw new AppError('Credenciales inválidas', 401);
    const ok = await bcrypt.compare(contraseña, user.contraseña);
    if (!ok) throw new AppError('Credenciales inválidas', 401);
    const roles = await rolRepo.getAll();
    const rol = roles.find(r => r.id_rol === user.id_rol)?.nombre_rol;
    const token = jwt.sign({ id_usuario: user.id_usuario, nombre: user.nombre, rol }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
    return { token, user: { id_usuario: user.id_usuario, nombre: user.nombre, rol } };
  },

  async list() { return usuarioRepo.list(); },
  async delete(id) { return usuarioRepo.deleteById(id); },
  async setRole({ id_usuario, nombre_rol }) {
    const rol = await rolRepo.getByName(nombre_rol);
    if (!rol) throw new AppError('Rol no existe', 404);
    await usuarioRepo.setRole(id_usuario, rol.id_rol);
  },
  async reportUsersOrders() { return usuarioRepo.reportUsersWithOrderCount(); }
};
