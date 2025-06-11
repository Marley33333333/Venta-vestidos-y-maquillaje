import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Home } from './components/pages/home/home';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    CommonModule,
    ReactiveFormsModule,
    Home
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'mi-tienda-productos';

  productoForm: FormGroup;
  variacionForm: FormGroup;
  activeTab: string = 'general';
  variaciones: any[] = [];
  mostrandoFormVariacion: boolean = false;
  categorias: any[] = [{ idCategoria: 1, nombreCategoria: 'Ropa' }];
  proveedores: any[] = [{ idProveedor: 1, nombreProveedor: 'Proveedor A' }];
  tallas: string[] = ['S', 'M', 'L'];
  colores: string[] = ['Rojo', 'Azul', 'Verde'];

  constructor(private fb: FormBuilder) {
    this.productoForm = this.fb.group({
      nombreProducto: ['', Validators.required],
      precioBase: [0, [Validators.required, Validators.min(0)]],
      idCategoria: ['', Validators.required],
      idProveedor: [''],
      imagenUrlPrincipal: [''],
      activo: [true],
      descripcionProducto: ['']
    });

    this.variacionForm = this.fb.group({
      sku: ['', Validators.required],
      talla: ['', Validators.required],
      color: [''],
      nombreMaterial: [''],
      precioAdicional: [0, Validators.min(0)],
      stockDisponible: [0, Validators.min(0)],
      imagenUrlVariacion: ['']
    });
  }

  getTabClass(tab: string) {
    return this.activeTab === tab
      ? 'text-blue-600 border-blue-600'
      : 'text-gray-500 border-transparent hover:text-blue-600 hover:border-blue-600';
  }

  isFieldInvalid(field: string) {
    const control = this.productoForm.get(field);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  isVariacionFieldInvalid(field: string) {
    const control = this.variacionForm.get(field);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  mostrarFormularioVariacion() {
    this.mostrandoFormVariacion = true;
  }

  cancelarVariacion() {
    this.mostrandoFormVariacion = false;
    this.variacionForm.reset();
  }

  agregarVariacion() {
    if (this.variacionForm.valid) {
      this.variaciones.push(this.variacionForm.value);
      this.cancelarVariacion();
    }
  }

  eliminarVariacion(index: number) {
    this.variaciones.splice(index, 1);
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'ruta/a/imagen-por-defecto.jpg';
  }

  onSubmit() {
    if (this.productoForm.valid) {
      console.log('Producto enviado:', this.productoForm.value);
    }
  }

  cancelar() {
    this.productoForm.reset();
  }
}