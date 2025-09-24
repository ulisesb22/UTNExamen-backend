import { usuarioService } from './usuarioService.js';
import { pedidoService } from './pedidoService.js';
import { productoService } from './productoService.js';

export const reporteService = {
  async usuariosConCantidadDePedidos() {
    return usuarioService.reportUsersOrders();
  },
  async pedidosConDetalle() {
    return pedidoService.reporteDetallePedidos();
  },
  async listarUsuarios() {
    return usuarioService.list();
  },
  async listarProductos() {
    return productoService.list();
  },
};
