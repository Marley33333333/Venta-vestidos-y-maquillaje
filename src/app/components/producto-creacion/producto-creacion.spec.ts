import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoCreacion } from './producto-creacion';

describe('ProductoCreacion', () => {
  let component: ProductoCreacion;
  let fixture: ComponentFixture<ProductoCreacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoCreacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoCreacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
