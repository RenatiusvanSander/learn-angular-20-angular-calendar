import { CalendarEventAction } from 'angular-calendar';
import { CalendarEvent, EventColor } from 'calendar-utils';
import { TutoringAppointment } from '../models/tutoring-appointment';
import { colors } from '../colors';

export class AppointmentCalendarEventModel implements CalendarEvent<TutoringAppointment>
{
  id?: string | number;
  start!: Date;
  end?: Date;
  title!: string;
  color?: EventColor;
  actions?: CalendarEventAction[];
  allDay?: boolean;
  cssClass?: string;
  resizable?: {
    beforeStart?: boolean;
    afterEnd?: boolean
  };
  draggable?: boolean;
  meta?: TutoringAppointment;

  constructor(init: {
    id?: string | number;
    start?: Date;
    end?: Date;
    title: string;
    color?: EventColor;
    meta?: TutoringAppointment;
    draggable?: boolean;
    resizable?: { beforeStart?: boolean; afterEnd?: boolean };
  }) {
    Object.assign(this, init);
    this.allDay = false; // Default value for allDay
    this.cssClass = ''; // Default value for cssClass
    this.actions = []; // Default value for actions
  }

  static createAppointmentCalendarEventModel(): AppointmentCalendarEventModel {
    const start = new Date();
    const end = new Date(start.getTime() + 60 * 60 * 1000); // Default duration of 1 hour

    return new AppointmentCalendarEventModel({
      id: 0, // Placeholder ID, should be set when the appointment is saved
      start,
      end,
      title: "Nachhilfe am " + start.toISOString().split('T')[0],
      color: colors['blue'], // TODO use enum for colors
      draggable: true,
      resizable: { beforeStart: true, afterEnd: true },
      meta: new TutoringAppointment(),
    });
  }

  get durationMinutes(): number | undefined {
    return this.end ? (this.end.getTime() - this.start.getTime()) / 60000 : undefined;
  }

  static fromTutoringAppointmentToAppointmentCalendarEventModel(tutoringAppointment: TutoringAppointment, actions: CalendarEventAction[]) : AppointmentCalendarEventModel {
    const event: AppointmentCalendarEventModel = new AppointmentCalendarEventModel(
    {
        id: tutoringAppointment.tutoringAppointmentNo,
        start: new Date(tutoringAppointment.tutoringAppointmentStartDateTime),
        end: tutoringAppointment.tutoringAppointmentEndDateTime ? new Date(tutoringAppointment.tutoringAppointmentEndDateTime) : undefined, 
        title: "Nachhilfe am " + tutoringAppointment.tutoringAppointmentDate,
        color: colors['blue'],
//           actions: undefined,
//           allDay: false,
//           cssClass: '',
        resizable: { beforeStart: true, afterEnd: true },
        draggable: true,
        meta: tutoringAppointment
    });
    event.actions = actions;

    return event;
  }
}