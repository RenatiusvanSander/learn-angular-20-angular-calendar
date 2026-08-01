import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TutoringAppointment } from '../models/tutoring-appointment';
import { firstValueFrom, lastValueFrom, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TutoringAppointmentDataService {

  private static apiUrl: String = 'http://localhost:8082/tutoring3/test/tutoring-appointments';

  appointments: Array<TutoringAppointment>;

  constructor(private http: HttpClient) {
    this.appointments = new Array<TutoringAppointment>();
    this.initializeData();
  }

  private initializeData(): void {
    const appointment1 = new TutoringAppointment();
    appointment1.tutoringAppointmentNo = 1;
    appointment1.tutoringAppointmentUser = 1;
    appointment1.accomplished = false;
    appointment1.tutoringAppointmentDate = new Date(2026, 0, 6).toISOString();
    appointment1.tutoringAppointmentStartDateTime = new Date(2026, 0, 6, 13, 0, 0).toISOString();
    appointment1.tutoringAppointmentEndDateTime = new Date(2026, 0, 6, 14, 0, 0).toISOString();
    appointment1.serviceContractId = 1;
    this.appointments.push(appointment1);

    const appointment2 = new TutoringAppointment();
    appointment2.tutoringAppointmentNo = 2;
    appointment2.tutoringAppointmentUser = 1;
    appointment2.accomplished = false;
    appointment2.tutoringAppointmentDate = new Date(2026, 0, 5).toISOString();
    appointment2.tutoringAppointmentStartDateTime = new Date(2024, 0, 5, 13, 0, 0).toISOString();
    appointment2.tutoringAppointmentEndDateTime = new Date(2024, 0, 5, 14, 0, 0).toISOString();
    appointment2.serviceContractId = 2;
    this.appointments.push(appointment2);

    const appointment3 = new TutoringAppointment();
    appointment3.tutoringAppointmentNo = 3;
    appointment3.tutoringAppointmentUser = 1;
    appointment3.accomplished = false;
    appointment3.tutoringAppointmentDate = new Date(2026, 0, 12).toISOString();
    appointment3.tutoringAppointmentStartDateTime = new Date(2026, 0, 12, 13, 0, 0).toISOString();
    appointment3.tutoringAppointmentEndDateTime = new Date(2026, 0, 12, 14, 0, 0).toISOString();
    appointment3.serviceContractId = 3;
    this.appointments.push(appointment3);
  }

  async getAppointmentsByUser(userId: number): Promise<Array<TutoringAppointment>> {
    if(userId <= 0) {
      throwError(() => new Error('Invalid user ID'));
    }

    return await lastValueFrom(this.http.get<Array<TutoringAppointment>>(`${TutoringAppointmentDataService.apiUrl}/get/by-user-id/${userId}`));
  }

  async persistAppointment(appointment: TutoringAppointment): Promise<TutoringAppointment> {
    return await firstValueFrom(this.http.post<TutoringAppointment>(`${TutoringAppointmentDataService.apiUrl}/save`, appointment));
  }

  async updateAppointment(appointment: TutoringAppointment): Promise<TutoringAppointment> {
    return await firstValueFrom(this.http.put<TutoringAppointment>(`${TutoringAppointmentDataService.apiUrl}/update/single-appointment`, appointment));
  }

  async deleteAppointment(appointment: TutoringAppointment): Promise<TutoringAppointment> {
    return await firstValueFrom(this.http.delete<TutoringAppointment>(`${TutoringAppointmentDataService.apiUrl}/delete/${appointment.tutoringAppointmentNo}`));
  }
}
