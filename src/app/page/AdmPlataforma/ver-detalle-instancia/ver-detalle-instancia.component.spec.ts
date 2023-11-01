import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleInstanciaComponent } from './ver-detalle-instancia.component';

describe('VerDetalleInstanciaComponent', () => {
  let component: VerDetalleInstanciaComponent;
  let fixture: ComponentFixture<VerDetalleInstanciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerDetalleInstanciaComponent]
    });
    fixture = TestBed.createComponent(VerDetalleInstanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
