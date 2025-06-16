import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdModal } from './ad-modal';

describe('AdModal', () => {
  let component: AdModal;
  let fixture: ComponentFixture<AdModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
