import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEstadisticasComponent } from './gestion-estadisticas.component';

describe('GestionEstadisticasComponent', () => {
  let component: GestionEstadisticasComponent;
  let fixture: ComponentFixture<GestionEstadisticasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionEstadisticasComponent]
    });
    fixture = TestBed.createComponent(GestionEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
