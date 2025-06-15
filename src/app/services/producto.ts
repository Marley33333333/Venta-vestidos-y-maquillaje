import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.interface';
import { ProductoRequest } from '../models/productorequest.interface'; // Asegúrate de importar esto

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  private apiUrl = 'https://dim-personalized-enormous-wiley.trycloudflare.com/api/v1'; // Cambia por la URL de tu API

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl + '/productos');
  }

  // Obtener un producto por ID
  getProductoPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo producto
  crearProducto(producto: ProductoRequest): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl + "/admin/productos/crear", producto);
  }

  // Actualizar un producto
  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  // Eliminar un producto
  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}