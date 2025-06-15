import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carritoKey = 'carrito';
  private carritoSubject: any = new BehaviorSubject<Producto[]>(this.getCarritoLocalStorage());

  constructor() { }

  get carrito$() {
    return this.carritoSubject.asObservable();
  }

  get cantidadProductos() {
    return this.getCarritoLocalStorage().length;
  }

  agregarProducto(producto: Producto): void {
    const carritoActual = this.carritoSubject.getValue();
    if (!carritoActual.some((p: Producto) => p.idProducto === producto.idProducto)) {
      carritoActual.push(producto);
      this.carritoSubject.next(carritoActual);
      this.guardarEnLocalStorage(carritoActual);
    }  
  }

    actualizarProducto(updatedProducto: Producto): void {
    const currentCarrito = this.carritoSubject.getValue();
    const updatedCarrito = currentCarrito.map((p: Producto) =>
      p.idProducto === updatedProducto.idProducto ? { ...updatedProducto } : p
    );
    this.carritoSubject.next(updatedCarrito);
  }

  eliminarProducto(producto: Producto): void {
    const carritoActual = this.carritoSubject.getValue();
    const nuevoCarrito = carritoActual.filter((p: Producto) => p.idProducto !== producto.idProducto);
    this.carritoSubject.next(nuevoCarrito);
    this.guardarEnLocalStorage(nuevoCarrito);
  }

  limpiarCarrito() {
    this.carritoSubject.next([]);
    localStorage.removeItem(this.carritoKey);
  }

  private guardarEnLocalStorage(carrito: Producto[]): void {
    localStorage.setItem(this.carritoKey, JSON.stringify(carrito));
  }

  private getCarritoLocalStorage(): Producto[] {
    const carrito = localStorage.getItem(this.carritoKey);
    return carrito ? JSON.parse(carrito) : [];
  }

  obtenerNombresProductos(): string[] {
    const carritoActual = this.carritoSubject.getValue();
    return carritoActual.map((p: Producto) => p.nombreProducto);
  }

}
