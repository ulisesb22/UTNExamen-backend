import db from '../config/db.js';

export const stockRepo = {
  async setStock(id_producto, cantidad) {
    await db.query('REPLACE INTO Stock (id_producto, cantidad_disponible) VALUES (?, ?)', [id_producto, cantidad]);
  },
  async getStock(id_producto) {
    const [rows] = await db.query('SELECT cantidad_disponible FROM Stock WHERE id_producto = ?', [id_producto]);
    return rows[0]?.cantidad_disponible ?? 0;
  },
  async reduceStock(id_producto, cantidad) {
    await db.query('UPDATE Stock SET cantidad_disponible = cantidad_disponible - ? WHERE id_producto = ? AND cantidad_disponible >= ?', [cantidad, id_producto, cantidad]);
  },
  async list() {
    const [rows] = await db.query('SELECT * FROM Stock');
    return rows;
  }
};
