import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarInstanciaComponent } from './borrar-instancia.component';

describe('BorrarInstanciaComponent', () => {
  let component: BorrarInstanciaComponent;
  let fixture: ComponentFixture<BorrarInstanciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrarInstanciaComponent]
    });
    fixture = TestBed.createComponent(BorrarInstanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
