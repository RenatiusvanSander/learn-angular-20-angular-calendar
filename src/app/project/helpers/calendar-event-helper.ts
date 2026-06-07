import { CalendarEvent } from "calendar-utils";
import { colors } from "../colors";
import { endOfDay } from "date-fns/endOfDay";
import { startOfDay } from "date-fns/startOfDay";

export class CalendarEventHelper {

    static createCalendarEvent(date?: Date): CalendarEvent<any> {
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