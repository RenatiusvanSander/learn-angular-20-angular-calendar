import { Component, inject } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { ColorsHelper } from '../../helpers/colors-helper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentCalendarEvent } from '../../tutoring-appointment-calender/appointment-calendar-event';

@Component({
  selector: 'app-edit-tutoring-date',
  standalone: false,
  templateUrl: './edit-tutoring-date.html',
  styleUrl: './edit-tutoring-date.css',
})
export class EditTutoringDate {

  resolveColor(event: AppointmentCalendarEvent<any>, colorType: string): any {
    return ColorsHelper.resolveColor(event, colorType);
  }

  activeModal: NgbActiveModal = inject(NgbActiveModal);

  event!: AppointmentCalendarEvent;

  action!: string;

  constructor() {
  }

  setEvent(event: AppointmentCalendarEvent) {
    this.event = event;
  }

  getEvent(): AppointmentCalendarEvent {
    return this.event;
  }

  setAction(action: string) {
    this.action = action;
  }

  save(event: CalendarEvent<any>) {
    this.activeModal.close({ event, action: 'save' });
  }

}
