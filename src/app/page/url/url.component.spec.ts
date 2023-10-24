import { ComponentFixture, TestBed } from '@angular/core/testing';

import { URLComponent } from './url.component';

describe('URLComponent', () => {
  let component: URLComponent;
  let fixture: ComponentFixture<URLComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [URLComponent]
    });
    fixture = TestBed.createComponent(URLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
