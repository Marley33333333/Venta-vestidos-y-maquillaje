import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaCreacion } from './categoria-creacion';

describe('CategoriaCreacion', () => {
  let component: CategoriaCreacion;
  let fixture: ComponentFixture<CategoriaCreacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaCreacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaCreacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
