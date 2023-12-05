import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesSugerenciasComponent } from './ajustes-sugerencias.component';

describe('AjustesSugerenciasComponent', () => {
  let component: AjustesSugerenciasComponent;
  let fixture: ComponentFixture<AjustesSugerenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjustesSugerenciasComponent]
    });
    fixture = TestBed.createComponent(AjustesSugerenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
