import { Routes } from '@angular/router';
import { ProductoListaComponent } from './components/producto-lista/producto-lista';
import { CategoriaCreacion } from './components/categoria-creacion/categoria-creacion';
import { ProveedorCreacion } from './components/proveedor-creacion/proveedor-creacion';
import { ProductoCreacion } from './components/producto-creacion/producto-creacion';
import { Home } from './components/pages/home/home';
import { CarritoComponent } from './components/carrito/carrito';
import { Admin } from './components/admin/admin';
import { AdminGuard } from './components/admin-guard/admin-guard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'productos', component: ProductoListaComponent },
  { path: 'productos/crear', component: ProductoCreacion, canActivate: [AdminGuard]  }, // Ruta para crear un nuevo producto
  { path: 'productos/:id', component: ProductoListaComponent }, // Ruta para ver un producto específico
  { path: 'categorias/crear', component: CategoriaCreacion, canActivate: [AdminGuard] }, // Ruta para ver todas las categorías
  { path: 'proveedores/crear', component: ProveedorCreacion, canActivate: [AdminGuard] }, // Ruta para ver todas los proveedores
  { path: 'carrito', component: CarritoComponent},
  { path: 'login', component: Login},
  { path: 'register', component: Register},
  { path: 'admin', component: Admin, canActivate: [AdminGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' } // Wildcard route para páginas no encontradas
];