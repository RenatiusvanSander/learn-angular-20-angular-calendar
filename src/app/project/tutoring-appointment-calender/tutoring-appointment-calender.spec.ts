import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoringAppointmentCalender } from './tutoring-appointment-calender';

describe('TutoringAppointmentCalender', () => {
  let component: TutoringAppointmentCalender;
  let fixture: ComponentFixture<TutoringAppointmentCalender>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutoringAppointmentCalender]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutoringAppointmentCalender);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
