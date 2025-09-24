import db from '../config/db.js';
import bcrypt from 'bcrypt';
import { bcryptConfig } from '../config/bcrypt.js';
import { ROLES } from '../utils/constants.js';

export async function seedSuperAdmin() {
  await db.query(`CREATE TABLE IF NOT EXISTS Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    id_rol INT,
    FOREIGN KEY (id_rol) REFERENCES Roles(id_rol)
  )`);

  const [rows] = await db.query('SELECT 1 FROM Usuarios WHERE nombre = ?', ['jefe5978']);
  if (rows.length === 0) {
    const [[rol]] = await db.query('SELECT id_rol FROM Roles WHERE nombre_rol = ?', [ROLES.SUPER_ADMIN]);
    const hash = await bcrypt.hash('contraseñajefe5978', bcryptConfig.rounds);
    await db.query('INSERT INTO Usuarios (nombre, contraseña, id_rol) VALUES (?, ?, ?)', ['jefe5978', hash, rol.id_rol]);
  }
}
