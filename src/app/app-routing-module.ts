import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { App } from './app';
import { MyCalendar } from './my-calendar/my-calendar';

const routes: Routes = [
  {
    path: 'my-calendar', component: MyCalendar
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
