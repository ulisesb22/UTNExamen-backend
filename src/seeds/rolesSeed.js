import db from '../config/db.js';
import { ROLES } from '../utils/constants.js';

export async function seedRoles() {
  await db.query(`CREATE TABLE IF NOT EXISTS Roles (
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    nombre_rol VARCHAR(50) UNIQUE NOT NULL
  )`);
  for (const nombre of [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER_COMUN]) {
    await db.query('INSERT IGNORE INTO Roles (nombre_rol) VALUES (?)', [nombre]);
  }
}
