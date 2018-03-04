import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IemailComponent } from './iemail.component';

describe('IemailComponent', () => {
  let component: IemailComponent;
  let fixture: ComponentFixture<IemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
