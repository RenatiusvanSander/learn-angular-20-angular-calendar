import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCalendar } from './my-calendar/my-calendar';
import { KitchenSinkExample } from './kitchen-sink-example/kitchen-sink-example';

const routes: Routes = [
  {
    path: 'my-calendar', component: MyCalendar
  },
  {
    path: 'kitchen-sink', component: KitchenSinkExample
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
