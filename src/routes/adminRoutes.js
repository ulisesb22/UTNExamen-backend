import { Router } from 'express';
import { adminController } from '../controllers/adminController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';
import { ROLES } from '../utils/constants.js';

const router = Router();

router.post('/sql', authMiddleware, roleMiddleware(ROLES.SUPER_ADMIN), adminController.execSql);

export default router;
