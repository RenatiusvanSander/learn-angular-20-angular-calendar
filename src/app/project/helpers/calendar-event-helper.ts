import { CalendarEvent } from "angular-calendar";
import { colors } from "../colors";
import { startOfDay } from "date-fns/startOfDay";
import { AppointmentCalendarEventModel } from "../models/tutoring-appointment-calendar-event-model";
import { TutoringAppointment } from "../models/tutoring-appointment";

export class CalendarEventHelper {

    static createCalendarEvent(date?: Date): CalendarEvent {
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
        newCalendarEvent.meta = newAppointment;

        return newCalendarEvent;
    }
}