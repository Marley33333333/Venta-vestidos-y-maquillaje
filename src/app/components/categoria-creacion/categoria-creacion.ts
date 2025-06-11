import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from '../../models/categoria.interface';
import { CategoriaService } from '../../services/categoria';
import { inject } from '@angular/core';

@Component({
  selector: 'app-categoria-creacion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './categoria-creacion.html',
  styleUrl: './categoria-creacion.css'
})
export class CategoriaCreacion {
  private readonly fb = inject(FormBuilder);
  private readonly categoriaService = inject(CategoriaService);
  private readonly router = inject(Router);
  
  categoriaForm!: FormGroup;
  categorias: Categoria[] = [];
  loading = false;
  error: string | null = null;
  success: string | null = null;
  editingCategoria: Categoria | null = null;

  ngOnInit(): void {
    this.initForm();
    this.cargarCategorias();
  }

  private initForm(): void {
    this.categoriaForm = this.fb.group({
      nombreCategoria: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      descripcionCategoria: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]]
    });
  }

  cargarCategorias(): void {
    this.loading = true;
    this.categoriaService.getCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar las categorías';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.categoriaForm.valid) {
      this.loading = true;
      this.error = null;
      this.success = null;

      const categoriaData: Categoria = this.categoriaForm.value;

      const request = this.editingCategoria 
        ? this.categoriaService.actualizarCategoria(this.editingCategoria.idCategoria!, categoriaData)
        : this.categoriaService.crearCategoria(categoriaData);

      request.subscribe({
        next: (categoria) => {
          this.success = this.editingCategoria 
            ? 'Categoría actualizada exitosamente' 
            : 'Categoría creada exitosamente';
          this.categoriaForm.reset();
          this.editingCategoria = null;
          this.cargarCategorias();
          this.loading = false;
        },
        error: (error) => {
          this.error = this.editingCategoria 
            ? 'Error al actualizar la categoría' 
            : 'Error al crear la categoría';
          this.loading = false;
          console.error('Error:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  editarCategoria(categoria: Categoria): void {
    this.editingCategoria = categoria;
    this.categoriaForm.patchValue({
      nombreCategoria: categoria.nombreCategoria,
      descripcionCategoria: categoria.descripcionCategoria
    });
    this.success = null;
    this.error = null;
  }

  cancelarEdicion(): void {
    this.editingCategoria = null;
    this.categoriaForm.reset();
    this.success = null;
    this.error = null;
  }

  eliminarCategoria(categoria: Categoria): void {
    if (confirm(`¿Estás seguro de que deseas eliminar la categoría "${categoria.nombreCategoria}"?`)) {
      this.loading = true;
      this.categoriaService.eliminarCategoria(categoria.idCategoria!).subscribe({
        next: () => {
          this.success = 'Categoría eliminada exitosamente';
          this.cargarCategorias();
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error al eliminar la categoría';
          this.loading = false;
          console.error('Error:', error);
        }
      });
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.categoriaForm.controls).forEach(key => {
      const control = this.categoriaForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.categoriaForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.categoriaForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} es requerido`;
      if (field.errors['minlength']) return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['maxlength']) return `${fieldName} no puede exceder ${field.errors['maxlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
