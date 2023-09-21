import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioUsuarioComponent } from './inicio-usuario.component';

describe('InicioUsuarioComponent', () => {
  let component: InicioUsuarioComponent;
  let fixture: ComponentFixture<InicioUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioUsuarioComponent]
    });
    fixture = TestBed.createComponent(InicioUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
