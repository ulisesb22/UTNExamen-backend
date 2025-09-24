import db from '../config/db.js';

export const rolRepo = {
  async getByName(nombre_rol) {
    const [rows] = await db.query('SELECT * FROM Roles WHERE nombre_rol = ?', [nombre_rol]);
    return rows[0] || null;
  },
  async getAll() {
    const [rows] = await db.query('SELECT * FROM Roles');
    return rows;
  }
};
