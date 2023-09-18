import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaInstanciaComponent } from './nueva-instancia.component';

describe('NuevaInstanciaComponent', () => {
  let component: NuevaInstanciaComponent;
  let fixture: ComponentFixture<NuevaInstanciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaInstanciaComponent]
    });
    fixture = TestBed.createComponent(NuevaInstanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
