import db from '../config/db.js';
import { AppError } from '../utils/AppError.js';

export const adminController = {
  async execSql(req, res, next) {
    try {
      const { sql } = req.body;
      if (!sql || typeof sql !== 'string' || sql.trim().length === 0) {
        throw new AppError('SQL requerido en el body', 400);
      }

      const [rows, fields] = await db.query(sql);
      res.json({ success: true, data: { rows, fields } });
    } catch (err) {
      next(err);
    }
  },
};
