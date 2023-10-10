import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAdminInstanciaComponent } from './inicio-admin-instancia.component';

describe('InicioAdminInstanciaComponent', () => {
  let component: InicioAdminInstanciaComponent;
  let fixture: ComponentFixture<InicioAdminInstanciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioAdminInstanciaComponent]
    });
    fixture = TestBed.createComponent(InicioAdminInstanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
