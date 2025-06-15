export interface Categoria {
  idCategoria: number;
  nombreCategoria: string;
  descripcionCategoria: string;
}

export interface Proveedor {
  idProveedor: number;
  nombreProveedor: string;
}

export interface Variacion {
  idVariacion: number;
  sku: string;
  talla: string;
  color: string;
  nombreMaterial: string;
  precioAdicional: number;
  stockDisponible: number;
  imagenUrlVariacion: string;
}

export interface Producto {
  idProducto: number;
  nombreProducto: string;
  descripcionProducto: string;
  precioBase: number;
  activo: boolean;
  imagenUrlPrincipal: string;
  categoria: Categoria;
  proveedor: Proveedor;
  variaciones: Variacion[];
  fechaCreacion: string;
  fechaActualizacion: string;
  cantidad?: number; // Optional field for cart management
}