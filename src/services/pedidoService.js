import { pedidoRepo } from '../repositories/pedidoRepo.js';
import { productoRepo } from '../repositories/productoRepo.js';
import { stockRepo } from '../repositories/stockRepo.js';
import { AppError } from '../utils/AppError.js';

export const pedidoService = {
  async crearPedido({ id_usuario, items }) {
    if (!Array.isArray(items) || items.length === 0) throw new AppError('Items requeridos');
    for (const it of items) {
      const prod = await productoRepo.getById(it.id_producto);
      if (!prod) throw new AppError(`Producto ${it.id_producto} no existe`, 404);
      const stock = await stockRepo.getStock(it.id_producto);
      if (!Number.isInteger(it.cantidad) || it.cantidad <= 0) throw new AppError('Cantidad inválida');
      if (it.cantidad > stock) throw new AppError(`Stock insuficiente para ${prod.nombre_producto}`);
    }
    const id_pedido = await pedidoRepo.createPedido({ id_usuario });
    for (const it of items) {
      const prod = await productoRepo.getById(it.id_producto);
      await stockRepo.reduceStock(it.id_producto, it.cantidad);
      await pedidoRepo.addProducto({ id_pedido, id_producto: it.id_producto, cantidad: it.cantidad, precio_unitario: prod.precio_unitario });
    }
    return { id_pedido };
  },
  async pedidosDeUsuario(id_usuario) {
    return pedidoRepo.getPedidosByUsuario(id_usuario);
  },
  async reporteDetallePedidos() { return pedidoRepo.reportPedidosDetalle(); }
};
