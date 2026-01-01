import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCalendar } from './my-calendar/my-calendar';
import { KitchenSinkExample } from './kitchen-sink-example/kitchen-sink-example';
import { TutoringAppointmentCalender } from './project/tutoring-appointment-calender/tutoring-appointment-calender';

const routes: Routes = [
  {
    path: 'my-calendar', component: MyCalendar
  },
  {
    path: 'kitchen-sink', component: KitchenSinkExample
  },
  {
    path: 'tutoring-appointment-calender', component: TutoringAppointmentCalender
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
