import { pedidoService } from '../services/pedidoService.js';

export const pedidoController = {
  async crear(req, res, next) {
    try {
      const id_usuario = req.user.id_usuario;
      const { items } = req.body;
      const r = await pedidoService.crearPedido({ id_usuario, items });
      res.status(201).json({ success: true, data: r });
    } catch(e){ next(e); }
  },
  async misPedidos(req, res, next) {
    try {
      const id_usuario = req.user.id_usuario;
      res.json({ success: true, data: await pedidoService.pedidosDeUsuario(id_usuario) });
    } catch(e){ next(e); }
  },
};
