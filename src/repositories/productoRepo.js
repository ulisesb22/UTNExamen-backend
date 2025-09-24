import db from '../config/db.js';

export const productoRepo = {
  async create({ nombre_producto, precio_unitario }) {
    const [r] = await db.query('INSERT INTO Productos (nombre_producto, precio_unitario) VALUES (?, ?)', [nombre_producto, precio_unitario]);
    return r.insertId;
  },
  async update(id_producto, { nombre_producto, precio_unitario }) {
    await db.query('UPDATE Productos SET nombre_producto = ?, precio_unitario = ? WHERE id_producto = ?', [nombre_producto, precio_unitario, id_producto]);
  },
  async delete(id_producto) {
    await db.query('DELETE FROM Productos WHERE id_producto = ?', [id_producto]);
  },
  async list() {
    const [rows] = await db.query('SELECT * FROM Productos');
    return rows;
  },
  async getById(id_producto) {
    const [rows] = await db.query('SELECT * FROM Productos WHERE id_producto = ?', [id_producto]);
    return rows[0] || null;
  }
};
