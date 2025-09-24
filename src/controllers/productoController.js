import { productoService } from '../services/productoService.js';

export const productoController = {
  async create(req, res, next) {
    try { const r = await productoService.create(req.body); res.status(201).json({ success: true, data: r }); }
    catch(e){ next(e); }
  },
  async update(req, res, next) {
    try { await productoService.update(Number(req.params.id), req.body); res.json({ success: true, message: 'Actualizado' }); }
    catch(e){ next(e); }
  },
  async delete(req, res, next) {
    try { await productoService.delete(Number(req.params.id)); res.json({ success: true, message: 'Eliminado' }); }
    catch(e){ next(e); }
  },
  async list(_req, res, next) {
    try { res.json({ success: true, data: await productoService.list() }); }
    catch(e){ next(e); }
  },
  async setStock(req, res, next) {
    try { await productoService.setStock(Number(req.params.id), Number(req.body.cantidad)); res.json({ success: true, message: 'Stock actualizado' }); }
    catch(e){ next(e); }
  },
};
