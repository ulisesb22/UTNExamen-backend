import db from '../config/db.js';

export async function ensureSchema() {
  await db.query(`CREATE TABLE IF NOT EXISTS Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    id_rol INT,
    FOREIGN KEY (id_rol) REFERENCES Roles(id_rol)
  )`);
  await db.query(`CREATE TABLE IF NOT EXISTS Pedidos (
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    fecha_pedido DATETIME NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
  )`);
  await db.query(`CREATE TABLE IF NOT EXISTS Pedido_Producto (
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_pedido, id_producto),
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
  )`);
}
