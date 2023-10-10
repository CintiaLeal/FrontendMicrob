import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmUsuarioInstanciaComponent } from './adm-usuario-instancia.component';

describe('AdmUsuarioInstanciaComponent', () => {
  let component: AdmUsuarioInstanciaComponent;
  let fixture: ComponentFixture<AdmUsuarioInstanciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmUsuarioInstanciaComponent]
    });
    fixture = TestBed.createComponent(AdmUsuarioInstanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
