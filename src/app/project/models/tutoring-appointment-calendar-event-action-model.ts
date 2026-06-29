import { CalendarEvent, CalendarEventAction } from "angular-calendar";

export class TutoringAppointmentCalendarEventActionModel implements CalendarEventAction {
  label!: string;
  a11yLabel!: string;
  onClick!: ({ event }: { event: CalendarEvent }) => void;
}