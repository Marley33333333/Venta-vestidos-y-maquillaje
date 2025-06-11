// src/app/components/producto-lista/producto-lista.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { ProductoService } from '../../services/producto';
import { Producto } from '../../models/producto.interface';

@Component({
  selector: 'app-producto-lista',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './producto-lista.html',
  styleUrl: './producto-lista.css'
})
export class ProductoListaComponent implements OnInit {
  
  private readonly productoService = inject(ProductoService);
  
  productos: Producto[] = [];
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.loading = true;
    this.error = null;
    
    this.productoService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los productos';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  calcularPrecioConVariacion(producto: Producto, variacion: any): number {
    return producto.precioBase + variacion.precioAdicional;
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/placeholder-product.jpg';
  }
}