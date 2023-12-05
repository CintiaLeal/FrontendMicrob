import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPruebasComponent } from './datos-pruebas.component';

describe('DatosPruebasComponent', () => {
  let component: DatosPruebasComponent;
  let fixture: ComponentFixture<DatosPruebasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosPruebasComponent]
    });
    fixture = TestBed.createComponent(DatosPruebasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
