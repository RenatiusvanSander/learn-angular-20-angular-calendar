import { CalendarEvent } from "angular-calendar";
import { colors } from "../colors";
import { startOfDay } from "date-fns/startOfDay";
import { AppointmentCalendarEventModel } from "../models/tutoring-appointment-calendar-event-model";
import { TutoringAppointment } from "../models/tutoring-appointment";

export class CalendarEventHelper {

    static createCalendarEvent(userId: number, date?: Date): CalendarEvent {
        const dateToUse: Date = startOfDay(date || new Date());
        const startDate: Date = new Date(date || new Date());
        const startHour: number = CalendarEventHelper.startHourOfDay(dateToUse);
        startDate.setHours(startHour, 0, 0, 0);
        const endDate: Date = new Date(date || new Date());
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
        newAppointment.accomplished = false;
        newAppointment.tutoringAppointmentDate = dateToUse.toISOString();
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

    static startHourOfDay(date: Date): number {
        const weekDay = date.getDay();
        
        return weekDay > 5 || weekDay === 0 ? 10 : 19;
    }

    static dateToIso8601String(date: Date): string {
        const days =date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${year}-${month.toString().padStart(2, '0')}-${days.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}