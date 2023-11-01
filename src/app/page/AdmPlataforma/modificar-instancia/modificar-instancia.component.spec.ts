import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarInstanciaComponent } from './modificar-instancia.component';

describe('ModificarInstanciaComponent', () => {
  let component: ModificarInstanciaComponent;
  let fixture: ComponentFixture<ModificarInstanciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarInstanciaComponent]
    });
    fixture = TestBed.createComponent(ModificarInstanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
