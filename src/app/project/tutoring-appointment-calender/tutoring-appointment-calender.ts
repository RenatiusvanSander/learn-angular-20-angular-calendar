import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  inject,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { colors } from '../colors';
import { CreateTutoringDate } from '../modals/create-tutoring-date/create-tutoring-date';
import { CalendarEventHelper } from '../helpers/calendar-event-helper';
import { ColorsHelper } from '../helpers/colors-helper';

@Component({
  selector: 'tutoring-appointment-calender',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
  templateUrl: './tutoring-appointment-calender.html',
  styleUrl: './tutoring-appointment-calender.css',
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ]
})
export class TutoringAppointmentCalender {
  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

refresh = new Subject<void>();
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors['red'],
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors['yellow'],
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors['blue'],
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors['yellow'],
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = true;
  openCreateTutoringDateModal: boolean = false;

  private modal = inject(NgbModal);

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.openCreateTutoringDateModal = false;

    if (isSameMonth(date, this.viewDate)) {
      if(!isSameDay(this.viewDate, date) && (this.activeDayIsOpen === false) && (events.length === 0)) {
        this.activeDayIsOpen = true;
        this.openCreateTutoringDateModal = true;
      } else if ( (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ) {
        this.activeDayIsOpen = false;
      } else if ( !isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) {
        this.activeDayIsOpen = events.length > 0 ? true : false;
        this.openCreateTutoringDateModal = events.length === 0;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;

      if(this.openCreateTutoringDateModal) {
        this.handleEvent('notSameDay Empty Date clicked', {} as CalendarEvent);

        if(this.activeDayIsOpen === false) {
          this.activeDayIsOpen = true;
        }
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  async handleEvent(action: string, event: CalendarEvent): Promise<void> {
    event = CalendarEventHelper.createCalendarEvent();
    const modalTutoringAppointmentCalenadar = this.modal.open(CreateTutoringDate, { size: 'lg' });
    modalTutoringAppointmentCalenadar.componentInstance.setEvent(event);
    modalTutoringAppointmentCalenadar.componentInstance.setAction(action);

    const result = await modalTutoringAppointmentCalenadar.result;

    if((result.action === 'save') && (result.event !== undefined)) {
      this.addEvent(result.event);
    }
  }

  addEvent(event: CalendarEvent | undefined): void {
    this.events = [
      ...this.events,
      event === undefined ? CalendarEventHelper.createCalendarEvent(): event,
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  resolveColor(event: CalendarEvent, colorType: string): string {
    return ColorsHelper.resolveColor(event, colorType);
  }
}
