import { VariacionProducto } from './variacionproducto.interface';
export interface ProductoRequest {
  nombreProducto: string;
  descripcionProducto: string;
  precioBase: number;
  idCategoria: number;
  idProveedor?: number;
  activo: boolean;
  variaciones: VariacionProducto[];
  imagenUrlPrincipal: string;
}