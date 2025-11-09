import { Component } from '@angular/core';
import { DateAdapter, provideCalendar, CalendarPreviousViewDirective, CalendarTodayDirective, CalendarNextViewDirective, CalendarMonthViewComponent, CalendarWeekViewComponent, CalendarDayViewComponent, CalendarEvent, CalendarView, CalendarDatePipe } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@Component({
  selector: 'app-my-calendar',
  standalone: false,
  templateUrl: './my-calendar.html',
  styleUrl: './my-calendar.css',
  providers: [
    provideCalendar({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class MyCalendar {

  activeDayIsOpen: boolean = true;
  view: CalendarView = CalendarView.Month;
  readonly CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'An event',
    },
  ];

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
