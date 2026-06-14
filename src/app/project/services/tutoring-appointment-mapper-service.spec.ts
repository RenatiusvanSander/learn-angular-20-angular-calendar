import { TestBed } from '@angular/core/testing';

import { TutoringAppointmentMapperService } from './tutoring-appointment-mapper-service';

describe('TutoringAppointmentMapperService', () => {
  let service: TutoringAppointmentMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutoringAppointmentMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
