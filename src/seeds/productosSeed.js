import db from '../config/db.js';

export async function seedProductos() {
  await db.query(`CREATE TABLE IF NOT EXISTS Productos (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre_producto VARCHAR(150) NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL
  )`);
  await db.query(`CREATE TABLE IF NOT EXISTS Stock (
    id_producto INT PRIMARY KEY,
    cantidad_disponible INT NOT NULL DEFAULT 0,
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto) ON DELETE CASCADE
  )`);
  const [count] = await db.query('SELECT COUNT(*) AS c FROM Productos');
  if (count[0].c === 0) {
    const prods = [
      ['Teclado Mecánico', 50000.00, 15],
      ['Mouse Gamer', 35000.00, 20],
      ['Monitor 24"', 120000.00, 8],
      ['Auriculares', 28000.00, 12],
      ['Webcam HD', 45000.00, 10],
      ['Silla Gamer', 220000.00, 11],
      ['Pad Mouse', 5000.00, 25],
      ['Parlantes', 32000.00, 13],
      ['Notebook 14"', 950000.00, 9],
      ['Placa de Video', 1200000.00, 0]
    ];
    for (const [nombre, precio, stock] of prods) {
      const [r] = await db.query('INSERT INTO Productos (nombre_producto, precio_unitario) VALUES (?, ?)', [nombre, precio]);
      await db.query('INSERT INTO Stock (id_producto, cantidad_disponible) VALUES (?, ?)', [r.insertId, stock]);
    }
  }
}
