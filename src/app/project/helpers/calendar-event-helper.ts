import { colors } from "../colors";
import { startOfDay } from "date-fns/startOfDay";
import { AppointmentCalendarEvent } from "../tutoring-appointment-calender/appointment-calendar-event";

export class CalendarEventHelper {

    static createCalendarEvent(date?: Date): AppointmentCalendarEvent {
        const eventDate = date ?? new Date();
        const endDate = new Date(eventDate);
        endDate.setHours(endDate.getHours() + 1);

        return {
            title: 'New event',
            start: startOfDay(eventDate),
            end: endDate,
            color: colors['red'],
            draggable: true,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
        };
    }
}