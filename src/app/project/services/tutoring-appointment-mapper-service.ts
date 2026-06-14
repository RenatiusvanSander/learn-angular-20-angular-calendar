import { Injectable } from '@angular/core';
import { TutoringAppointment } from '../models/tutoring-appointment';
import { AppointmentCalendarEventModel } from '../models/tutoring-appointment-calendar-event-model';

@Injectable({
  providedIn: 'root',
})
export class TutoringAppointmentMapperService {
  
  convertTutoringAppointmentToAppointmentCalendarEventModel(appointments: Array<TutoringAppointment>): Array<AppointmentCalendarEventModel> {
    let calendarEvents: Array<AppointmentCalendarEventModel> = new Array<AppointmentCalendarEventModel>();
    for (let appointment of appointments) {
      let calendarEvent = AppointmentCalendarEventModel.fromTutoringAppointment(appointment);
      calendarEvents.push(calendarEvent);
    }

    return calendarEvents;
  }

  convertAppointmentCalendarEventModelToTutoringAppointment(calendarEvents: Array<AppointmentCalendarEventModel>): Array<TutoringAppointment> {
    let tutoringAppointments: Array<TutoringAppointment> = new Array<TutoringAppointment>();
    for (let calendarEvent of calendarEvents) {
      let tutoringAppointment = TutoringAppointment.fromAppointmentCalendarEventModel(calendarEvent);
      tutoringAppointments.push(tutoringAppointment);
    }

    return tutoringAppointments;
  }
}
