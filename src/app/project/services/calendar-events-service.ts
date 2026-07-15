import { Injectable } from '@angular/core';
import { TutoringAppointmentDataService } from './tutoring-appointment-data-service';
import { CalendarEvent } from 'angular-calendar';
import { TutoringAppointment } from '../models/tutoring-appointment';
import { TutoringAppointmentMapperService } from './tutoring-appointment-mapper-service';

@Injectable({
  providedIn: 'root',
})
export class CalendarEventsService {

   constructor(private appointmentDataService: TutoringAppointmentDataService, private appointmentMapper: TutoringAppointmentMapperService) {}

   async loadCalendarEventsForUser(userId: number, actions: any[]): Promise<Array<CalendarEvent>> {
    const loadedUserAppointments : Array<TutoringAppointment> = await this.appointmentDataService.getAppointmentsByUser(userId);
    const calendarEvents : Array<CalendarEvent> = this.appointmentMapper.convertTutoringAppointmentToAppointmentCalendarEventModel(loadedUserAppointments, actions);
    
    return calendarEvents;
   }
}
