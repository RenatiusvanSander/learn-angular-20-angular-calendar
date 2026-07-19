import { CalendarEvent } from "angular-calendar";
import { colors } from "../colors";
import { startOfDay } from "date-fns/startOfDay";
import { AppointmentCalendarEventModel } from "../models/tutoring-appointment-calendar-event-model";
import { TutoringAppointment } from "../models/tutoring-appointment";

export class CalendarEventHelper {

    static createCalendarEvent(userId: number, date?: Date): CalendarEvent {
        const eventDate = date ?? new Date();
        const endDate = new Date(eventDate);
        endDate.setHours(endDate.getHours() + 1);

        const newCalendarEvent = new AppointmentCalendarEventModel({
            title: 'New event',
            start: startOfDay(eventDate),
            end: endDate,
            color: colors['red'],
            draggable: true,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
        });
        
        const newAppointment = new TutoringAppointment();
        newAppointment.tutoringAppointmentNo = 0;
        newAppointment.tutoringAppointmentUser = userId;
        newAppointment.serviceContractId = 0;
        newAppointment.isAccomplished = false;
        newAppointment.tutoringAppointmentDate = undefined as unknown as string;
        newAppointment.tutoringAppointmentStartDateTime = undefined as unknown as string;
        newAppointment.tutoringAppointmentEndDateTime = undefined as unknown as string;
        newCalendarEvent.meta = newAppointment;

        return newCalendarEvent;
    }

    static copyCalendarEvent(originalEvent: CalendarEvent): CalendarEvent {
        const copiedEvent = new AppointmentCalendarEventModel({
            id: originalEvent.id,
            start: new Date(originalEvent.start),
            end: originalEvent.end ? new Date(originalEvent.end) : undefined,
            title: originalEvent.title,
            color: originalEvent.color,
            resizable: originalEvent.resizable ? { ...originalEvent.resizable } : undefined,
            draggable: originalEvent.draggable,
            meta: originalEvent.meta ? { ...originalEvent.meta } : undefined,
        });

        copiedEvent.allDay = originalEvent.allDay;
        copiedEvent.actions = originalEvent.actions ? [...originalEvent.actions] : undefined;
        copiedEvent.cssClass = originalEvent.cssClass;

        return copiedEvent;
    }
}