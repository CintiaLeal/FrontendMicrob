import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerInstanciaComponent } from './ver-instancia.component';

describe('VerInstanciaComponent', () => {
  let component: VerInstanciaComponent;
  let fixture: ComponentFixture<VerInstanciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerInstanciaComponent]
    });
    fixture = TestBed.createComponent(VerInstanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
