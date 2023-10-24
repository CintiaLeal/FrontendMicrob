import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPlatformAdministratorComponent } from './header-platform-administrator.component';

describe('HeaderPlatformAdministratorComponent', () => {
  let component: HeaderPlatformAdministratorComponent;
  let fixture: ComponentFixture<HeaderPlatformAdministratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderPlatformAdministratorComponent]
    });
    fixture = TestBed.createComponent(HeaderPlatformAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
