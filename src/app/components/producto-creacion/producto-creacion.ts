import { Component, OnInit } from '@angular/core';
import { VariacionProducto } from '../../models/variacionproducto.interface';
import { ProductoRequest } from '../../models/productorequest.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../services/categoria';
import { ProveedorService } from '../../services/proveedor';
import { ProductoService } from '../../services/producto';
import { Categoria } from '../../models/producto.interface';
import { Proveedor } from '../../models/proveedor.interface';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto-creacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-creacion.html',
  styleUrl: './producto-creacion.css'
})
export class ProductoCreacion implements OnInit {
  productoForm!: FormGroup;
  variacionForm!: FormGroup;
  activeTab: 'general' | 'variaciones' = 'general';
  mostrandoFormVariacion = false;
  variaciones: VariacionProducto[] = [];

  categorias: Categoria[] = [];
  proveedores: Proveedor[] = [];

  tallas = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  colores = ['Rojo', 'Azul', 'Verde', 'Negro', 'Blanco', 'Gris', 'Rosa', 'Amarillo'];

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private proveedorService: ProveedorService,
    private productoService: ProductoService // <-- Agrega esta línea
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error cargando categorías', err)
    });
    this.proveedorService.getProveedores().subscribe({
      next: (data) => this.proveedores = data,
      error: (err) => console.error('Error cargando proveedores', err)
    });
  }

  private initializeForms(): void {
    this.productoForm = this.fb.group({
      nombreProducto: ['', [Validators.required]],
      descripcionProducto: [''],
      precioBase: ['', [Validators.required, Validators.min(0)]],
      idCategoria: ['', [Validators.required]],
      idProveedor: [''],
      activo: [true],
      imagenUrlPrincipal: ['']
    });

    this.variacionForm = this.fb.group({
      sku: ['', [Validators.required]],
      talla: ['', [Validators.required]],
      color: [''],
      nombreMaterial: [''],
      precioAdicional: [0, [Validators.min(0)]],
      stockDisponible: [0, [Validators.min(0)]],
      imagenUrlVariacion: ['']
    });
  }

  getTabClass(tab: string): string {
    return this.activeTab === tab 
      ? 'border-blue-500 text-blue-600 bg-blue-50'
      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.productoForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isVariacionFieldInvalid(fieldName: string): boolean {
    const field = this.variacionForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  mostrarFormularioVariacion(): void {
    this.mostrandoFormVariacion = true;
    this.variacionForm.reset();
    this.variacionForm.patchValue({
      precioAdicional: 0,
      stockDisponible: 0
    });
  }

  cancelarVariacion(): void {
    this.mostrandoFormVariacion = false;
    this.variacionForm.reset();
  }

  agregarVariacion(): void {
    if (this.variacionForm.valid) {
      const nuevaVariacion: VariacionProducto = {
        ...this.variacionForm.value,
        id: Date.now()
      };
      
      this.variaciones.push(nuevaVariacion);
      this.cancelarVariacion();
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.variacionForm.controls).forEach(key => {
        this.variacionForm.get(key)?.markAsTouched();
      });
    }
  }

  eliminarVariacion(index: number): void {
    this.variaciones.splice(index, 1);
  }

  onImageError(event: any): void {
    event.target.style.display = 'none';
  }

  cancelar(): void {
    // Lógica para cancelar (navegar atrás, limpiar formulario, etc.)
    this.productoForm.reset();
    this.variaciones = [];
    console.log('Operación cancelada');
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
      const productoData: ProductoRequest = {
        ...this.productoForm.value,
        variaciones: this.variaciones.map(v => {
          const { id, ...variacionSinId } = v;
          return variacionSinId;
        })
      };

      console.log('Producto a crear:', productoData);
      
      // Aquí iría la llamada al servicio para crear el producto
      this.productoService.crearProducto(productoData).subscribe({
        next: (response) => {
          alert('Producto creado exitosamente!');
          console.log('Producto creado exitosamente:', response);
          // Aquí puedes navegar a la lista de productos o mostrar un mensaje de éxito personalizado
        },
        error: (error) => {
          console.error('Error al crear producto:', error);
          alert('Hubo un error al crear el producto. Intenta nuevamente.');
        }
      });
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.productoForm.controls).forEach(key => {
        this.productoForm.get(key)?.markAsTouched();
      });
    }
  }  

  setActiveTab(tab: 'general' | 'variaciones') {
    this.activeTab = tab;
    if (tab === 'variaciones') {
      this.mostrandoFormVariacion = true;
      this.variacionForm.reset();
      this.variacionForm.patchValue({
        precioAdicional: 0,
        stockDisponible: 0
      });
    }
  }
}