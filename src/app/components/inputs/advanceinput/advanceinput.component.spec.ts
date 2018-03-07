import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceinputComponent } from './advanceinput.component';

describe('AdvanceinputComponent', () => {
  let component: AdvanceinputComponent;
  let fixture: ComponentFixture<AdvanceinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvanceinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
