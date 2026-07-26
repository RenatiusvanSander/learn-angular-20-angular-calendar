import { CalendarEvent } from "angular-calendar";
import { colors } from "../colors";
import { startOfDay } from "date-fns/startOfDay";
import { AppointmentCalendarEventModel } from "../models/tutoring-appointment-calendar-event-model";
import { TutoringAppointment } from "../models/tutoring-appointment";

export class CalendarEventHelper {

    static createCalendarEvent(userId: number, date?: Date): CalendarEvent {
        const dateToUse = new Date(date || new Date());
        dateToUse.setHours(0, 0, 0, 0);
        const startDate = new Date(date || new Date());
        startDate.setHours(19, 0, 0, 0);
        const endDate = new Date(date || new Date());
        endDate.setHours(startDate.getHours() + 1, 0, 0, 0);

        const newCalendarEvent = new AppointmentCalendarEventModel({
            title: 'New event',
            start: startDate,
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
        newAppointment.tutoringAppointmentDate = startOfDay(startDate).toISOString();
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