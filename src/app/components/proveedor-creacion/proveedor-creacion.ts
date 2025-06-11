import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProveedorService } from '../../services/proveedor';
import { Proveedor } from '../../models/proveedor.interface';
import { OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-proveedor-creacion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './proveedor-creacion.html',
  styleUrl: './proveedor-creacion.css'
})
export class ProveedorCreacion implements OnInit {
  
  private readonly fb = inject(FormBuilder);
  private readonly proveedorService = inject(ProveedorService);
  private readonly router = inject(Router);
  
  proveedorForm!: FormGroup;
  proveedores: Proveedor[] = [];
  loading = false;
  error: string | null = null;
  success: string | null = null;
  editingProveedor: Proveedor | null = null;

  ngOnInit(): void {
    this.initForm();
    this.cargarProveedores();
  }

  private initForm(): void {
    this.proveedorForm = this.fb.group({
      nombreProveedor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]]
    });
  }

  cargarProveedores(): void {
    this.loading = true;
    this.proveedorService.getProveedores().subscribe({
      next: (proveedores) => {
        this.proveedores = proveedores;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los proveedores';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.proveedorForm.valid) {
      this.loading = true;
      this.error = null;
      this.success = null;

      const proveedorData: Proveedor = this.proveedorForm.value;

      const request = this.editingProveedor 
        ? this.proveedorService.actualizarProveedor(this.editingProveedor.idProveedor!, proveedorData)
        : this.proveedorService.crearProveedor(proveedorData);

      request.subscribe({
        next: (proveedor) => {
          this.success = this.editingProveedor 
            ? 'Proveedor actualizado exitosamente' 
            : 'Proveedor creado exitosamente';
          this.proveedorForm.reset();
          this.editingProveedor = null;
          this.cargarProveedores();
          this.loading = false;
        },
        error: (error) => {
          this.error = this.editingProveedor 
            ? 'Error al actualizar el proveedor' 
            : 'Error al crear el proveedor';
          this.loading = false;
          console.error('Error:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  editarProveedor(proveedor: Proveedor): void {
    this.editingProveedor = proveedor;
    this.proveedorForm.patchValue({
      nombreProveedor: proveedor.nombreProveedor
    });
    this.success = null;
    this.error = null;
  }

  cancelarEdicion(): void {
    this.editingProveedor = null;
    this.proveedorForm.reset();
    this.success = null;
    this.error = null;
  }

  eliminarProveedor(proveedor: Proveedor): void {
    if (confirm(`¿Estás seguro de que deseas eliminar el proveedor "${proveedor.nombreProveedor}"?`)) {
      this.loading = true;
      this.proveedorService.eliminarProveedor(proveedor.idProveedor!).subscribe({
        next: () => {
          this.success = 'Proveedor eliminado exitosamente';
          this.cargarProveedores();
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error al eliminar el proveedor';
          this.loading = false;
          console.error('Error:', error);
        }
      });
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.proveedorForm.controls).forEach(key => {
      const control = this.proveedorForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.proveedorForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.proveedorForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} es requerido`;
      if (field.errors['minlength']) return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['maxlength']) return `${fieldName} no puede exceder ${field.errors['maxlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
