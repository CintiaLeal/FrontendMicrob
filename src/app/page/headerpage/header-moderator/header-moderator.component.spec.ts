import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderModeratorComponent } from './header-moderator.component';

describe('HeaderModeratorComponent', () => {
  let component: HeaderModeratorComponent;
  let fixture: ComponentFixture<HeaderModeratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderModeratorComponent]
    });
    fixture = TestBed.createComponent(HeaderModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
