import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInstanceAdministratorComponent } from './header-instance-administrator.component';

describe('HeaderInstanceAdministratorComponent', () => {
  let component: HeaderInstanceAdministratorComponent;
  let fixture: ComponentFixture<HeaderInstanceAdministratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderInstanceAdministratorComponent]
    });
    fixture = TestBed.createComponent(HeaderInstanceAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
