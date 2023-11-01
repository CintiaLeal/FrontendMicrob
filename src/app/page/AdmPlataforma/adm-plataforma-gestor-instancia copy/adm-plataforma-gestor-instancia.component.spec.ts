import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmPlataformaGestorInstanciaComponent } from './adm-plataforma-gestor-instancia.component';

describe('AdmPlataformaGestorInstanciaComponent', () => {
  let component: AdmPlataformaGestorInstanciaComponent;
  let fixture: ComponentFixture<AdmPlataformaGestorInstanciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmPlataformaGestorInstanciaComponent]
    });
    fixture = TestBed.createComponent(AdmPlataformaGestorInstanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
