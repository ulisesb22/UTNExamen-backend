import db from '../config/db.js';

export const usuarioRepo = {
  async create({ nombre, contraseña, id_rol }) {
    const [r] = await db.query(
      'INSERT INTO Usuarios (nombre, contraseña, id_rol) VALUES (?, ?, ?)',
      [nombre, contraseña, id_rol]
    );
    return r.insertId;
  },
  async findByName(nombre) {
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE nombre = ?', [nombre]);
    return rows[0] || null;
  },
  async findById(id) {
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE id_usuario = ?', [id]);
    return rows[0] || null;
  },
  async deleteById(id) {
    await db.query('DELETE FROM Usuarios WHERE id_usuario = ?', [id]);
  },
  async list() {
    const [rows] = await db.query('SELECT id_usuario, nombre, id_rol FROM Usuarios');
    return rows;
  },
  async setRole(id_usuario, id_rol) {
    await db.query('UPDATE Usuarios SET id_rol = ? WHERE id_usuario = ?', [id_rol, id_usuario]);
  },
  async reportUsersWithOrderCount() {
    const [rows] = await db.query(`
      SELECT u.id_usuario, u.nombre, COUNT(p.id_pedido) AS pedidos
      FROM Usuarios u
      LEFT JOIN Pedidos p ON p.id_usuario = u.id_usuario
      GROUP BY u.id_usuario, u.nombre
      ORDER BY pedidos DESC;
    `);
    return rows;
  },
};
