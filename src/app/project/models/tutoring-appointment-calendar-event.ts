import { CalendarEvent, EventAction, EventColor } from "calendar-utils";

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

    static tutoringAppointmentToTutoringAppointmentCalendarEvent(tutoringAppointment : TutoringAppointmentCalendarEvent) : TutoringAppointmentCalendarEvent {
        const tutoringAppointmentCalendarEvent = new TutoringAppointmentCalendarEvent();

        return tutoringAppointmentCalendarEvent;
    }

}