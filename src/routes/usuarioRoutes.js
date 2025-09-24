import { Router } from 'express';
import { usuarioController } from '../controllers/usuarioController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';
import { ROLES } from '../utils/constants.js';

const router = Router();

router.post('/register', usuarioController.register);
router.post('/login', usuarioController.login);

router.get('/', authMiddleware, roleMiddleware(ROLES.SUPER_ADMIN, ROLES.ADMIN), usuarioController.list);
router.delete('/:id', authMiddleware, roleMiddleware(ROLES.SUPER_ADMIN), usuarioController.delete);
router.post('/:id/promote', authMiddleware, roleMiddleware(ROLES.SUPER_ADMIN), usuarioController.setAdmin);

router.get('/report/cantidad-pedidos', authMiddleware, roleMiddleware(ROLES.SUPER_ADMIN, ROLES.ADMIN), usuarioController.reportUsersOrders);

export default router;
