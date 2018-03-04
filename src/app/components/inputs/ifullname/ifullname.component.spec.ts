import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IfullnameComponent } from './ifullname.component';

describe('IfullnameComponent', () => {
  let component: IfullnameComponent;
  let fixture: ComponentFixture<IfullnameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IfullnameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IfullnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
