import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAdmPlataformaComponent } from './inicio-adm-plataforma.component';

describe('InicioAdmPlataformaComponent', () => {
  let component: InicioAdmPlataformaComponent;
  let fixture: ComponentFixture<InicioAdmPlataformaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioAdmPlataformaComponent]
    });
    fixture = TestBed.createComponent(InicioAdmPlataformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
