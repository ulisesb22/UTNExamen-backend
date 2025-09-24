import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { errorMiddleware } from './src/middlewares/errorMiddleware.js';
import usuarioRoutes from './src/routes/usuarioRoutes.js';
import productoRoutes from './src/routes/productoRoutes.js';
import pedidoRoutes from './src/routes/pedidoRoutes.js';
import reporteRoutes from './src/routes/reporteRoutes.js';
import rolRoutes from './src/routes/rolRoutes.js';
import stockRoutes from './src/routes/stockRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ success: true, message: 'UTNExamen API running' });
});

app.use('/api/v1/usuarios', usuarioRoutes);
app.use('/api/v1/productos', productoRoutes);
app.use('/api/v1/pedidos', pedidoRoutes);
app.use('/api/v1/reportes', reporteRoutes);
app.use('/api/v1/roles', rolRoutes);
app.use('/api/v1/stock', stockRoutes);
app.use('/api/v1/admin', adminRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
