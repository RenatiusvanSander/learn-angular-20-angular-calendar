import { AppointmentCalendarEventModel } from "./tutoring-appointment-calendar-event-model";

export class TutoringAppointment {
    tutoringAppointmentNo!: number;
    tutoringAppointmentUser!: number; 
    tutoringAppointmentDate!: string;
    tutoringAppointmentStartDateTime!: string;
    tutoringAppointmentEndDateTime!: string;
    serviceContractId!: number;
    isAccomplished!: boolean;

    static fromHttp(tutoringAppointment : TutoringAppointment) : TutoringAppointment {
        const newTutoringAppointment = new TutoringAppointment();
        newTutoringAppointment.tutoringAppointmentNo = tutoringAppointment.tutoringAppointmentNo;
        newTutoringAppointment.tutoringAppointmentUser = tutoringAppointment.tutoringAppointmentUser;
        newTutoringAppointment.tutoringAppointmentDate = tutoringAppointment.tutoringAppointmentDate;
        newTutoringAppointment.tutoringAppointmentStartDateTime = tutoringAppointment.tutoringAppointmentStartDateTime;
        newTutoringAppointment.tutoringAppointmentEndDateTime = tutoringAppointment.tutoringAppointmentEndDateTime;
        newTutoringAppointment.serviceContractId = tutoringAppointment.serviceContractId;
        newTutoringAppointment.isAccomplished = tutoringAppointment.isAccomplished;

        return newTutoringAppointment;
    }

    static fromAppointmentCalendarEventModel(calendarEvent: AppointmentCalendarEventModel) : TutoringAppointment {
      const tutoringAppointment = new TutoringAppointment();
      tutoringAppointment.tutoringAppointmentNo = calendarEvent.meta ? calendarEvent.meta.tutoringAppointmentNo as number : 0;
      tutoringAppointment.tutoringAppointmentStartDateTime = calendarEvent.start.toISOString();
      tutoringAppointment.tutoringAppointmentEndDateTime = calendarEvent.end ? calendarEvent.end.toISOString() : '';
      tutoringAppointment.tutoringAppointmentDate = calendarEvent.start.toISOString().split('T')[0];
      tutoringAppointment.isAccomplished = calendarEvent.meta ? calendarEvent.meta.isAccomplished : false;
      tutoringAppointment.serviceContractId = calendarEvent.meta ? calendarEvent.meta.serviceContractId : 0;
      tutoringAppointment.tutoringAppointmentUser = calendarEvent.meta ? calendarEvent.meta.tutoringAppointmentUser : 0;

      return tutoringAppointment;
    }
}