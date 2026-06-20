import { CalendarEvent, EventAction, EventColor } from "calendar-utils";
import { AppointmentCalendarEventModel } from "./tutoring-appointment-calendar-event-model";
import { TutoringAppointment } from "./tutoring-appointment";

export class TutoringAppointmentCalendarEvent implements CalendarEvent{
    id?: string | number | undefined;
    start!: Date;
    end?: Date | undefined;
    title!: string;
    color?: EventColor | undefined;
    actions?: EventAction[] | undefined;
    allDay?: boolean | undefined;
    cssClass?: string | undefined;
    resizable?: { beforeStart?: boolean; afterEnd?: boolean; } | undefined;
    draggable?: boolean | undefined;
    meta?: any;

    static fromHttp(tutoringAppointmentCalendarEvent : TutoringAppointmentCalendarEvent) : TutoringAppointmentCalendarEvent {
        const newtutoringAppointmentCalendarEvent = new TutoringAppointmentCalendarEvent();

        return newtutoringAppointmentCalendarEvent;
    }

    static fromTutoringAppointmentToAppointmentCalendarEventModel(tutoringAppointment: TutoringAppointment) : AppointmentCalendarEventModel {
      const calendarEvent = new AppointmentCalendarEventModel({ title: "" });
      calendarEvent.meta = tutoringAppointment;
      calendarEvent.title = `Tutoring #${tutoringAppointment.tutoringAppointmentNo}`;
      calendarEvent.start = new Date(tutoringAppointment.tutoringAppointmentStartDateTime);
      calendarEvent.end = tutoringAppointment.tutoringAppointmentEndDateTime ? new Date(tutoringAppointment.tutoringAppointmentEndDateTime) : undefined;

      return calendarEvent;
    }

}