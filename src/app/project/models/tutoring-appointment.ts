import { CalendarEventHelper } from "../helpers/calendar-event-helper";
import { AppointmentCalendarEventModel } from "./tutoring-appointment-calendar-event-model";

export class TutoringAppointment {
    tutoringAppointmentNo!: number;
    tutoringAppointmentUser!: number; 
    tutoringAppointmentDate!: string;
    tutoringAppointmentStartDateTime!: string;
    tutoringAppointmentEndDateTime!: string;
    serviceContractId!: number;
    accomplished!: boolean;

    static fromHttp(tutoringAppointment : TutoringAppointment) : TutoringAppointment {
        const newTutoringAppointment = new TutoringAppointment();
        newTutoringAppointment.tutoringAppointmentNo = tutoringAppointment.tutoringAppointmentNo;
        newTutoringAppointment.tutoringAppointmentUser = tutoringAppointment.tutoringAppointmentUser;
        newTutoringAppointment.tutoringAppointmentDate = tutoringAppointment.tutoringAppointmentDate;
        newTutoringAppointment.tutoringAppointmentStartDateTime = tutoringAppointment.tutoringAppointmentStartDateTime;
        newTutoringAppointment.tutoringAppointmentEndDateTime = tutoringAppointment.tutoringAppointmentEndDateTime;
        newTutoringAppointment.serviceContractId = tutoringAppointment.serviceContractId;
        newTutoringAppointment.accomplished = tutoringAppointment.accomplished;

        return newTutoringAppointment;
    }

    static fromAppointmentCalendarEventModelToTutoringAppointment(calendarEvent: AppointmentCalendarEventModel) : TutoringAppointment {
      const tutoringAppointment = new TutoringAppointment();
      tutoringAppointment.tutoringAppointmentNo = calendarEvent.meta ? calendarEvent.meta.tutoringAppointmentNo as number : 0;
      tutoringAppointment.tutoringAppointmentStartDateTime = CalendarEventHelper.dateToIso8601String(calendarEvent.start);
      tutoringAppointment.tutoringAppointmentEndDateTime = calendarEvent.end ? CalendarEventHelper.dateToIso8601String(calendarEvent.end) : '';
      tutoringAppointment.tutoringAppointmentDate = calendarEvent.meta ? calendarEvent.meta.tutoringAppointmentDate : '';
      tutoringAppointment.accomplished = calendarEvent.meta ? calendarEvent.meta.accomplished : false;
      tutoringAppointment.serviceContractId = calendarEvent.meta ? calendarEvent.meta.serviceContractId : 0;
      tutoringAppointment.tutoringAppointmentUser = calendarEvent.meta ? calendarEvent.meta.tutoringAppointmentUser : 0;

      return tutoringAppointment;
    }
    
}