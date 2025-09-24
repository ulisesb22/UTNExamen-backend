import { Router } from 'express';
import { reporteController } from '../controllers/reporteController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';
import { ROLES } from '../utils/constants.js';

const router = Router();

router.get('/usuarios-con-pedidos', authMiddleware, roleMiddleware(ROLES.SUPER_ADMIN, ROLES.ADMIN), reporteController.usuariosConPedidos);
router.get('/pedidos-detalle', authMiddleware, roleMiddleware(ROLES.SUPER_ADMIN, ROLES.ADMIN), reporteController.pedidosDetalle);
router.get('/usuarios', authMiddleware, roleMiddleware(ROLES.SUPER_ADMIN, ROLES.ADMIN), reporteController.usuarios);
router.get('/productos', authMiddleware, roleMiddleware(ROLES.SUPER_ADMIN, ROLES.ADMIN), reporteController.productos);

export default router;
