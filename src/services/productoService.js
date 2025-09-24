import { productoRepo } from '../repositories/productoRepo.js';
import { stockRepo } from '../repositories/stockRepo.js';
import { AppError } from '../utils/AppError.js';

export const productoService = {
  async create({ nombre_producto, precio_unitario, stock = 0 }) {
    if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/.test(nombre_producto || '')) throw new AppError('Nombre de producto inválido');
    const precio = Number(precio_unitario);
    if (!Number.isFinite(precio) || precio <= 0) throw new AppError('Precio inválido');
    const id = await productoRepo.create({ nombre_producto, precio_unitario: precio });
    await stockRepo.setStock(id, Number(stock));
    return { id_producto: id };
  },
  async update(id, { nombre_producto, precio_unitario }) {
    const precio = Number(precio_unitario);
    if (!Number.isFinite(precio) || precio <= 0) throw new AppError('Precio inválido');
    await productoRepo.update(id, { nombre_producto, precio_unitario: precio });
  },
  async delete(id) { await productoRepo.delete(id); },
  async list() { return productoRepo.list(); },
  async setStock(id, cantidad) {
    const c = Number(cantidad);
    if (!Number.isInteger(c) || c < 0) throw new AppError('Stock inválido');
    await stockRepo.setStock(id, c);
  },
  async listStock() { return stockRepo.list(); },
};
