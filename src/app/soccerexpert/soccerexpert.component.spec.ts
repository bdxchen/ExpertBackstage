import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoccerexpertComponent } from './soccerexpert.component';

describe('SoccerexpertComponent', () => {
  let component: SoccerexpertComponent;
  let fixture: ComponentFixture<SoccerexpertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoccerexpertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoccerexpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
