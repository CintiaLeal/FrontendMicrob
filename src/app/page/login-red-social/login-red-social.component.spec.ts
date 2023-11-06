import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRedSocialComponent } from './login-red-social.component';

describe('LoginRedSocialComponent', () => {
  let component: LoginRedSocialComponent;
  let fixture: ComponentFixture<LoginRedSocialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginRedSocialComponent]
    });
    fixture = TestBed.createComponent(LoginRedSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
