import { usuarioService } from '../services/usuarioService.js';
import { ROLES } from '../utils/constants.js';

export const usuarioController = {
  async register(req, res, next) {
    try {
      const { nombre, contraseña } = req.body;
      const r = await usuarioService.register({ nombre, contraseña });
      res.status(201).json({ success: true, data: r, message: 'Usuario registrado' });
    } catch (e) { next(e); }
  },
  async login(req, res, next) {
    try {
      const { nombre, contraseña } = req.body;
      const r = await usuarioService.login({ nombre, contraseña });
      res.json({ success: true, data: r, message: 'Login OK' });
    } catch (e) { next(e); }
  },
  async list(_req, res, next) {
    try { res.json({ success: true, data: await usuarioService.list() }); }
    catch(e){ next(e); }
  },
  async delete(req, res, next) {
    try { await usuarioService.delete(Number(req.params.id)); res.json({ success: true, message: 'Usuario eliminado' }); }
    catch(e){ next(e); }
  },
  async setAdmin(req, res, next) {
    try {
      const id_usuario = Number(req.params.id);
      await usuarioService.setRole({ id_usuario, nombre_rol: ROLES.ADMIN });
      res.json({ success: true, message: 'Usuario ahora es admin' });
    } catch(e){ next(e); }
  },
  async reportUsersOrders(_req, res, next) {
    try { res.json({ success: true, data: await usuarioService.reportUsersOrders() }); }
    catch(e){ next(e); }
  },
};
