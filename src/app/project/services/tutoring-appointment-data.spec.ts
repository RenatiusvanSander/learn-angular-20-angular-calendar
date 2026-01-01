import { TestBed } from '@angular/core/testing';

import { TutoringAppointmentData } from './tutoring-appointment-data';

describe('TutoringAppointmentData', () => {
  let service: TutoringAppointmentData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutoringAppointmentData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
