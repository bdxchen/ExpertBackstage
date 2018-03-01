import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertdetailComponent } from './expertdetail.component';

describe('ExpertdetailComponent', () => {
  let component: ExpertdetailComponent;
  let fixture: ComponentFixture<ExpertdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
