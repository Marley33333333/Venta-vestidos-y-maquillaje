import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorCreacion } from './proveedor-creacion';

describe('ProveedorCreacion', () => {
  let component: ProveedorCreacion;
  let fixture: ComponentFixture<ProveedorCreacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorCreacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorCreacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
