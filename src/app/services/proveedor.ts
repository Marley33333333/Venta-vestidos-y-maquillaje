import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor.interface';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://may-button-xi-investment.trycloudflare.com/api/v1/proveedores'; // Cambia por la URL de tu API

  // Obtener todos los proveedores
  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl);
  }

  // Obtener un proveedor por ID
  getProveedorPorId(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo proveedor
  crearProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.apiUrl + '/registrar', proveedor);
  }

  // Actualizar un proveedor
  actualizarProveedor(id: number, proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(`${this.apiUrl}/${id}`, proveedor);
  }

  // Eliminar un proveedor
  eliminarProveedor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
