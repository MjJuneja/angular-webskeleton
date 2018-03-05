import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpasswordComponent } from './ipassword.component';

describe('IpasswordComponent', () => {
  let component: IpasswordComponent;
  let fixture: ComponentFixture<IpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
