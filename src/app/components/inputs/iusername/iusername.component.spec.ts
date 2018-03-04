import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IusernameComponent } from './iusername.component';

describe('IusernameComponent', () => {
  let component: IusernameComponent;
  let fixture: ComponentFixture<IusernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IusernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IusernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
