import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CalendarPreviousViewDirective, CalendarTodayDirective, CalendarNextViewDirective, CalendarMonthViewComponent, CalendarWeekViewComponent, CalendarDayViewComponent, CalendarDatePipe, DateAdapter, provideCalendar, CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MyCalendar } from './my-calendar/my-calendar';
import { KitchenSinkExample } from './kitchen-sink-example/kitchen-sink-example';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { FlatpickrDirective, provideFlatpickrDefaults } from 'angularx-flatpickr';

@NgModule({
  declarations: [
    App,
    MyCalendar,
    KitchenSinkExample,
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
    CalendarDatePipe,
    FormsModule,
    JsonPipe,
    FlatpickrDirective
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideFlatpickrDefaults(),
    provideCalendar({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  bootstrap: [App]
})
export class AppModule { }
