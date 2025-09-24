import 'dotenv/config';
import db from '../config/db.js';
import { seedRoles } from './rolesSeed.js';
import { seedSuperAdmin } from './superAdminSeed.js';
import { seedProductos } from './productosSeed.js';
import { ensureSchema } from './schemaSeed.js';

async function run() {
  try {
    await seedRoles();
    await seedProductos();
    await ensureSchema();
    await seedSuperAdmin();
    console.log('Seeds ejecutados correctamente.');
  } catch (e) {
    console.error('Error al ejecutar seeds:', e);
  } finally {
    await db.end();
  }
}
run();
