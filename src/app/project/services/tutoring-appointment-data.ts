import { Injectable } from '@angular/core';
import { TutoringAppointment } from '../models/tutoring-appointment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TutoringAppointmentData {

  appointments: Array<TutoringAppointment>;

  constructor() {
    this.appointments = new Array<TutoringAppointment>();
    this.initializeData();
  }

  private initializeData(): void {
    const appointment1 = new TutoringAppointment();
    appointment1.tutoringAppointmentNo = 1;
    appointment1.tutoringAppointmentUser = 1;
    appointment1.isAccomplished = false;
    appointment1.tutoringAppointmentDate = new Date(2026, 0, 6).toISOString();
    appointment1.tutoringAppointmentStartDateTime = new Date(2026, 0, 6, 13, 0, 0).toISOString();
    appointment1.tutoringAppointmentEndDateTime = new Date(2026, 0, 6, 14, 0, 0).toISOString();
    appointment1.serviceContractId = 1;
    this.appointments.push(appointment1);

    const appointment2 = new TutoringAppointment();
    appointment2.tutoringAppointmentNo = 2;
    appointment2.tutoringAppointmentUser = 1;
    appointment2.isAccomplished = false;
    appointment2.tutoringAppointmentDate = new Date(2026, 0, 5).toISOString();
    appointment2.tutoringAppointmentStartDateTime = new Date(2024, 0, 5, 13, 0, 0).toISOString();
    appointment2.tutoringAppointmentEndDateTime = new Date(2024, 0, 5, 14, 0, 0).toISOString();
    appointment2.serviceContractId = 2;
    this.appointments.push(appointment2);

    const appointment3 = new TutoringAppointment();
    appointment3.tutoringAppointmentNo = 3;
    appointment3.tutoringAppointmentUser = 1;
    appointment3.isAccomplished = false;
    appointment3.tutoringAppointmentDate = new Date(2026, 0, 12).toISOString();
    appointment3.tutoringAppointmentStartDateTime = new Date(2026, 0, 12, 13, 0, 0).toISOString();
    appointment3.tutoringAppointmentEndDateTime = new Date(2026, 0, 12, 14, 0, 0).toISOString();
    appointment3.serviceContractId = 3;
    this.appointments.push(appointment3);
  }

  getAppointmentsByUser(userId: number): Array<TutoringAppointment> {
    if(userId <= 0) {
      throwError(() => new Error('Invalid user ID'));
    }

    return this.appointments;
  }
  
}
