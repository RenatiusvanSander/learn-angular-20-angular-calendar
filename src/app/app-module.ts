import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CalendarPreviousViewDirective, CalendarTodayDirective, CalendarNextViewDirective, CalendarMonthViewComponent, CalendarWeekViewComponent, CalendarDayViewComponent, CalendarDatePipe, DateAdapter, provideCalendar } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MyCalendar } from './my-calendar/my-calendar';

@NgModule({
  declarations: [
    App,
    MyCalendar,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalendarPreviousViewDirective,
    CalendarTodayDirective,
    CalendarNextViewDirective,
    CalendarMonthViewComponent,
    CalendarWeekViewComponent,
    CalendarDayViewComponent,
    CalendarDatePipe
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideCalendar({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  bootstrap: [App]
})
export class AppModule { }
