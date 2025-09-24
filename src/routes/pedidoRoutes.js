import { Router } from 'express';
import { pedidoController } from '../controllers/pedidoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', authMiddleware, pedidoController.crear);
router.get('/mios', authMiddleware, pedidoController.misPedidos);

export default router;
