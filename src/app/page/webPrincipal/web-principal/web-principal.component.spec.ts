import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebPrincipalComponent } from './web-principal.component';

describe('WebPrincipalComponent', () => {
  let component: WebPrincipalComponent;
  let fixture: ComponentFixture<WebPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebPrincipalComponent]
    });
    fixture = TestBed.createComponent(WebPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
