import inquirer from 'inquirer';
import axios from 'axios';
import 'dotenv/config';

const baseURL = `http://localhost:${process.env.PORT || 3000}/api/v1`;

let token = null;
let currentUser = null;

async function register() {
  const { nombre, contraseña } = await inquirer.prompt([
    { name: 'nombre', message: 'Nombre de usuario:', validate: v => /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{3,}$/.test(v) || 'Nombre inválido' },
    { name: 'contraseña', type: 'password', message: 'Contraseña (min 6):', validate: v => v.length>=6 || 'Muy corta' },
  ]);
  await axios.post(`${baseURL}/usuarios/register`, { nombre, contraseña });
  console.log('Registro OK. Ahora inicia sesión.');
}

async function login() {
  const { nombre, contraseña } = await inquirer.prompt([
    { name: 'nombre', message: 'Usuario:' },
    { name: 'contraseña', type: 'password', message: 'Contraseña:' },
  ]);
  const r = await axios.post(`${baseURL}/usuarios/login`, { nombre, contraseña });
  token = r.data.data.token;
  currentUser = r.data.data.user;
  console.log(`Login OK. Rol: ${currentUser.rol}`);
}

async function listProducts() {
  const r = await axios.get(`${baseURL}/productos`);
  console.table(r.data.data);
}

async function makeOrder() {
  await listProducts();
  const items = [];
  while (true) {
    const { id_producto, cantidad } = await inquirer.prompt([
      { name: 'id_producto', message: 'ID producto (enter para terminar):', default: '' },
      { name: 'cantidad', message: 'Cantidad:', when: (ans)=> ans.id_producto!=='', validate: v => Number.isInteger(Number(v)) && Number(v)>0 || 'Cantidad inválida' },
    ]);
    if (!id_producto) break;
    items.push({ id_producto: Number(id_producto), cantidad: Number(cantidad) });
  }
  if (!items.length) return;
  const r = await axios.post(`${baseURL}/pedidos`, { items }, { headers: { Authorization: `Bearer ${token}` } });
  console.log('Pedido creado:', r.data.data);
}

async function reportsMenu() {
  const { op } = await inquirer.prompt([{
    type: 'list', name: 'op', message: 'Reportes', choices: [
      { name: 'Usuarios con cantidad de pedidos', value: 'u' },
      { name: 'Pedidos con detalle de productos y totales', value: 'p' },
      { name: 'Listar todos los usuarios', value: 'lu' },
      { name: 'Listar todos los productos', value: 'lp' },
    ]
  }]);
  const headers = { Authorization: `Bearer ${token}` };
  if (op==='u') console.table((await axios.get(`${baseURL}/reportes/usuarios-con-pedidos`, { headers })).data.data);
  if (op==='p') console.table((await axios.get(`${baseURL}/reportes/pedidos-detalle`, { headers })).data.data);
  if (op==='lu') console.table((await axios.get(`${baseURL}/reportes/usuarios`, { headers })).data.data);
  if (op==='lp') console.table((await axios.get(`${baseURL}/reportes/productos`, { headers })).data.data);
}

async function adminMenu() {
  while (true) {
    const { op } = await inquirer.prompt([{
      type: 'list', name: 'op', message: 'Admin Menu', choices: [
        { name: 'Listar productos', value: 'list' },
        { name: 'Crear producto', value: 'create' },
        { name: 'Editar producto', value: 'edit' },
        { name: 'Eliminar producto', value: 'delete' },
        { name: 'Reportes', value: 'reports' },
        { name: 'Salir', value: 'exit' },
      ]
    }]);
    if (op==='exit') break;
    if (op==='list') await listProducts();
    if (op==='create') {
      const { nombre_producto, precio_unitario, stock } = await inquirer.prompt([
        { name: 'nombre_producto', message: 'Nombre producto:', validate: v => /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/.test(v) || 'Inválido' },
        { name: 'precio_unitario', message: 'Precio:', validate: v => Number(v)>0 || 'Precio inválido' },
        { name: 'stock', message: 'Stock:', validate: v => Number(v)>=0 || 'Stock inválido' },
      ]);
      await axios.post(`${baseURL}/productos`, { nombre_producto, precio_unitario, stock }, { headers: { Authorization: `Bearer ${token}` } });
      console.log('Producto creado');
    }
    if (op==='edit') {
      const { id, nombre_producto, precio_unitario } = await inquirer.prompt([
        { name: 'id', message: 'ID producto:' },
        { name: 'nombre_producto', message: 'Nuevo nombre:' },
        { name: 'precio_unitario', message: 'Nuevo precio:' },
      ]);
      await axios.put(`${baseURL}/productos/${id}`, { nombre_producto, precio_unitario }, { headers: { Authorization: `Bearer ${token}` } });
      console.log('Producto actualizado');
    }
    if (op==='delete') {
      const { id } = await inquirer.prompt([{ name: 'id', message: 'ID producto:' }]);
      await axios.delete(`${baseURL}/productos/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      console.log('Producto eliminado');
    }
    if (op==='reports') await reportsMenu();
  }
}

async function superAdminMenu() {
  while (true) {
    const { op } = await inquirer.prompt([{
      type: 'list', name: 'op', message: 'SuperAdmin Menu', choices: [
        { name: 'Gestionar usuarios (listar/promover/eliminar)', value: 'users' },
        { name: 'Reportes', value: 'reports' },
        { name: 'Ejecutar SQL avanzada', value: 'sql' },
        { name: 'Salir', value: 'exit' },
      ]
    }]);
    if (op==='exit') break;
    if (op==='users') {
      const users = await axios.get(`${baseURL}/usuarios`, { headers: { Authorization: `Bearer ${token}` } });
      console.table(users.data.data);
      const { action } = await inquirer.prompt([{ type:'list', name:'action', choices:[ 'promover a admin', 'eliminar', 'volver' ] }]);
      if (action==='promover a admin') {
        const { id } = await inquirer.prompt([{ name:'id', message:'ID usuario:' }]);
        await axios.post(`${baseURL}/usuarios/${id}/promote`, {}, { headers: { Authorization: `Bearer ${token}` } });
        console.log('Promovido a admin');
      } else if (action==='eliminar') {
        const { id } = await inquirer.prompt([{ name:'id', message:'ID usuario:' }]);
        await axios.delete(`${baseURL}/usuarios/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        console.log('Usuario eliminado');
      }
    }
    if (op==='reports') await reportsMenu();
    if (op==='sql') {
      const { sql } = await inquirer.prompt([
        { name: 'sql', message: 'Ingrese la consulta SQL a ejecutar (cualquier sentencia):', validate: v => (v && v.trim().length>0) || 'Consulta vacía' }
      ]);
      try {
        const r = await axios.post(`${baseURL}/admin/sql`, { sql }, { headers: { Authorization: `Bearer ${token}` }});
        const data = r.data.data;
        if (Array.isArray(data.rows)) console.table(data.rows);
        else console.log('Resultado:', data);
      } catch (err) {
        console.error('Error al ejecutar SQL:', err.response?.data || err.message);
      }
    }
  }
}

async function userMenu() {
  while (true) {
    const { op } = await inquirer.prompt([{
      type: 'list', name: 'op', message: 'User Menu', choices: [
        { name: 'Listar productos', value: 'list' },
        { name: 'Hacer pedido', value: 'order' },
        { name: 'Mis pedidos', value: 'mine' },
        { name: 'Salir', value: 'exit' },
      ]
    }]);
    if (op==='exit') break;
    if (op==='list') await listProducts();
    if (op==='order') await makeOrder();
    if (op==='mine') {
      const r = await axios.get(`${baseURL}/pedidos/mios`, { headers: { Authorization: `Bearer ${token}` } });
      console.table(r.data.data);
    }
  }
}

async function mainMenu() {
  while (true) {
    const { op } = await inquirer.prompt([{
      type: 'list', name: 'op', message: 'Bienvenido', choices: ['Register','Login','Salir']
    }]);
    if (op==='Salir') break;
    if (op==='Register') { await register(); }
    if (op==='Login') {
      await login();
      if (currentUser.rol === 'superAdmin') await superAdminMenu();
      else if (currentUser.rol === 'admin') await adminMenu();
      else await userMenu();
    }
  }
}

mainMenu().catch(err => console.error(err.response?.data || err.message));
