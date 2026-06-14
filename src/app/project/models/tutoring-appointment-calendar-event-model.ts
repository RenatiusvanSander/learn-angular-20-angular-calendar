import { CalendarEventAction } from 'angular-calendar';
import { CalendarEvent, EventColor } from 'calendar-utils';
import { TutoringAppointment } from '../models/tutoring-appointment';

export class AppointmentCalendarEventModel
  implements CalendarEvent<TutoringAppointment>
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
  }

  static fromTutoringAppointment(
    appointment: TutoringAppointment
  ): AppointmentCalendarEventModel {
    const start = new Date(appointment.tutoringAppointmentStartDateTime);
    const end = new Date(appointment.tutoringAppointmentEndDateTime);

    return new AppointmentCalendarEventModel({
      id: appointment.tutoringAppointmentNo,
      start,
      end,
      title: `Tutoring #${appointment.tutoringAppointmentNo}`,
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
      draggable: true,
      resizable: { beforeStart: true, afterEnd: true },
      meta: appointment,
    });
  }

  get durationMinutes(): number | undefined {
    return this.end ? (this.end.getTime() - this.start.getTime()) / 60000 : undefined;
  }
}