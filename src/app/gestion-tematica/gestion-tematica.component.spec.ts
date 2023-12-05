import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTematicaComponent } from './gestion-tematica.component';

describe('GestionTematicaComponent', () => {
  let component: GestionTematicaComponent;
  let fixture: ComponentFixture<GestionTematicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionTematicaComponent]
    });
    fixture = TestBed.createComponent(GestionTematicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
