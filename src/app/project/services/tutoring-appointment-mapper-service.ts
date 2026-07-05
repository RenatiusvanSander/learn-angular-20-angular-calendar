import { Injectable } from '@angular/core';
import { TutoringAppointment } from '../models/tutoring-appointment';
import { AppointmentCalendarEventModel } from '../models/tutoring-appointment-calendar-event-model';
import { CalendarEventAction } from 'angular-calendar';

@Injectable({
  providedIn: 'root',
})
export class TutoringAppointmentMapperService {
  
  convertTutoringAppointmentToAppointmentCalendarEventModel(appointments: Array<TutoringAppointment>, actions: CalendarEventAction[]): Array<AppointmentCalendarEventModel> {
    let calendarEvents: Array<AppointmentCalendarEventModel> = new Array<AppointmentCalendarEventModel>();
    for (let appointment of appointments) {
      let calendarEvent = AppointmentCalendarEventModel.fromTutoringAppointmentToAppointmentCalendarEventModel(appointment, actions);
      calendarEvents.push(calendarEvent);
    }

    return calendarEvents;
  }

  convertSingleTutoringAppointmentToAppointmentCalendarEventModel(appointment: TutoringAppointment, actions: CalendarEventAction[]): AppointmentCalendarEventModel {
    return AppointmentCalendarEventModel.fromTutoringAppointmentToAppointmentCalendarEventModel(appointment, actions);
  }

  convertAppointmentCalendarEventModelToTutoringAppointment(calendarEvents: Array<any>): Array<TutoringAppointment> {
    let tutoringAppointments: Array<TutoringAppointment> = new Array<TutoringAppointment>();
    for (let calendarEvent of calendarEvents) {
      let tutoringAppointment = TutoringAppointment.fromAppointmentCalendarEventModelToTutoringAppointment(calendarEvent);
      tutoringAppointments.push(tutoringAppointment);
    }

    return tutoringAppointments;
  }
}
