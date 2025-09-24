import { Router } from 'express';
import { productoController } from '../controllers/productoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';
import { ROLES } from '../utils/constants.js';

const router = Router();

router.get('/', productoController.list);
router.post('/', authMiddleware, roleMiddleware(ROLES.SUPER_ADMIN, ROLES.ADMIN), productoController.create);
router.put('/:id', authMiddleware, roleMiddleware(ROLES.SUPER_ADMIN, ROLES.ADMIN), productoController.update);
router.delete('/:id', authMiddleware, roleMiddleware(ROLES.SUPER_ADMIN, ROLES.ADMIN), productoController.delete);
router.post('/:id/stock', authMiddleware, roleMiddleware(ROLES.SUPER_ADMIN, ROLES.ADMIN), productoController.setStock);

export default router;
