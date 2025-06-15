import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Added for ngModel
import { CarritoService } from '../../services/carrito';
import { Producto } from '../../models/producto.interface';

@Component({
  selector: 'app-carrito',
  standalone: true, // Assuming standalone component based on Angular 20
  imports: [CommonModule, FormsModule], // Added FormsModule
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class CarritoComponent implements OnInit {
  productosCarrito: Producto[] = [];
  totalPrecio: number = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe((productos: Producto[]) => {
      this.productosCarrito = productos.map(p => ({
        ...p,
        cantidad: p.cantidad || 1 // Ensure each product has a cantidad property
      }));
      this.calcularTotal();
    });
  }

  actualizarCantidad(idProducto: number, delta: number): void {
    const producto = this.productosCarrito.find(p => p.idProducto === idProducto);
    if (producto) {
      if (delta === 0) {
        // Handle manual input, ensure cantidad is at least 1
        producto.cantidad = Math.max(1, producto.cantidad || 1);
      } else {
        // Handle +/- buttons
        producto.cantidad = Math.max(1, (producto.cantidad || 1) + delta);
      }
      // Update the carritoService with the new product state
      this.carritoService.actualizarProducto({ ...producto });
      this.calcularTotal();
    }
  }

  eliminar(idProducto: number): void {
    const producto = this.productosCarrito.find(p => p.idProducto === idProducto);
    if (producto) {
      this.carritoService.eliminarProducto(producto);
    }
  }

  vaciarCarrito(): void {
    this.carritoService.limpiarCarrito();
  }

  finalizarCompra(): void {
    alert('Gracias por tu compra');
    this.carritoService.limpiarCarrito();
  }

  private calcularTotal(): void {
    this.totalPrecio = this.productosCarrito.reduce((total, producto) => {
      return total + (producto.precioBase || 0) * (producto.cantidad || 1);
    }, 0);
  }
}