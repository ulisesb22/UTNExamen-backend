import { reporteService } from '../services/reporteService.js';

export const reporteController = {
  async usuariosConPedidos(_req, res, next) {
    try { res.json({ success: true, data: await reporteService.usuariosConCantidadDePedidos() }); }
    catch(e){ next(e); }
  },
  async pedidosDetalle(_req, res, next) {
    try { res.json({ success: true, data: await reporteService.pedidosConDetalle() }); }
    catch(e){ next(e); }
  },
  async usuarios(_req, res, next) {
    try { res.json({ success: true, data: await reporteService.listarUsuarios() }); }
    catch(e){ next(e); }
  },
  async productos(_req, res, next) {
    try { res.json({ success: true, data: await reporteService.listarProductos() }); }
    catch(e){ next(e); }
  },
};
