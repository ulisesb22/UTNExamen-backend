import db from '../config/db.js';

export const pedidoRepo = {
  async createPedido({ id_usuario }) {
    const [r] = await db.query('INSERT INTO Pedidos (id_usuario, fecha_pedido) VALUES (?, NOW())', [id_usuario]);
    return r.insertId;
  },
  async addProducto({ id_pedido, id_producto, cantidad, precio_unitario }) {
    await db.query(
      'INSERT INTO Pedido_Producto (id_pedido, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
      [id_pedido, id_producto, cantidad, precio_unitario]
    );
  },
  async getPedidosByUsuario(id_usuario) {
    const [rows] = await db.query('SELECT * FROM Pedidos WHERE id_usuario = ?', [id_usuario]);
    return rows;
  },
  async reportPedidosDetalle() {
    const [rows] = await db.query(`
      SELECT p.id_pedido, u.nombre AS usuario, pr.nombre_producto, pp.cantidad, pp.precio_unitario,
             (pp.cantidad * pp.precio_unitario) AS total_linea
      FROM Pedidos p
      JOIN Usuarios u ON u.id_usuario = p.id_usuario
      JOIN Pedido_Producto pp ON pp.id_pedido = p.id_pedido
      JOIN Productos pr ON pr.id_producto = pp.id_producto
      ORDER BY p.id_pedido;
    `);
    return rows;
  }
};
