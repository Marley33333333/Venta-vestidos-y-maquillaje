import { Routes } from '@angular/router';
import { ProductoListaComponent } from './components/producto-lista/producto-lista';
import { CategoriaCreacion } from './components/categoria-creacion/categoria-creacion';
import { ProveedorCreacion } from './components/proveedor-creacion/proveedor-creacion';
import { ProductoCreacion } from './components/producto-creacion/producto-creacion';
import { Home } from './components/pages/home/home';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'productos', component: ProductoListaComponent },
  { path: 'productos/crear', component: ProductoCreacion }, // Ruta para crear un nuevo producto
  { path: 'productos/:id', component: ProductoListaComponent }, // Ruta para ver un producto específico
  { path: 'categorias', component: CategoriaCreacion }, // Ruta para ver todas las categorías
  { path: 'proveedores', component: ProveedorCreacion }, // Ruta para ver todas los proveedores
  { path: '', redirectTo: '/home', pathMatch: 'full' } // Wildcard route para páginas no encontradas
];