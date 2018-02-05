import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectmatchComponent } from './selectmatch.component';

describe('SelectmatchComponent', () => {
  let component: SelectmatchComponent;
  let fixture: ComponentFixture<SelectmatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectmatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectmatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
