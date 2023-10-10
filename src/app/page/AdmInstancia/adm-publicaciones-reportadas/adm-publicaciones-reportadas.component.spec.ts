import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmPublicacionesReportadasComponent } from './adm-publicaciones-reportadas.component';

describe('AdmPublicacionesReportadasComponent', () => {
  let component: AdmPublicacionesReportadasComponent;
  let fixture: ComponentFixture<AdmPublicacionesReportadasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmPublicacionesReportadasComponent]
    });
    fixture = TestBed.createComponent(AdmPublicacionesReportadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
