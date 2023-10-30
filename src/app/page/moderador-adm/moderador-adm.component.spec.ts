import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeradorAdmComponent } from './moderador-adm.component';

describe('ModeradorAdmComponent', () => {
  let component: ModeradorAdmComponent;
  let fixture: ComponentFixture<ModeradorAdmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeradorAdmComponent]
    });
    fixture = TestBed.createComponent(ModeradorAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
