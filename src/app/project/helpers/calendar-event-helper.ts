import { CalendarEvent } from "calendar-utils";
import { colors } from "../colors";
import { endOfDay } from "date-fns/endOfDay";
import { startOfDay } from "date-fns/startOfDay";

export class CalendarEventHelper {

    static createCalendarEvent(): CalendarEvent<any> {
        return {
            title: 'New event',
            start: startOfDay(new Date()),
            end: endOfDay(new Date()),
            color: colors['red'],
            draggable: true,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
        };
    }
}