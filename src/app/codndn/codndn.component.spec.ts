import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodndnComponent } from './codndn.component';

describe('CodndnComponent', () => {
  let component: CodndnComponent;
  let fixture: ComponentFixture<CodndnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodndnComponent]
    });
    fixture = TestBed.createComponent(CodndnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
