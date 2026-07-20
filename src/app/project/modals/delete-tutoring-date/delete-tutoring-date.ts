import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-delete-tutoring-date',
  standalone: false,
  templateUrl: './delete-tutoring-date.html',
  styleUrl: './delete-tutoring-date.css',
})
export class DeleteTutoringDate {
  
  activeModal: NgbActiveModal = inject(NgbActiveModal);

  event!: CalendarEvent;

  action!: string;

  constructor() {}

  setEvent(event: CalendarEvent) {
    this.event = event;
  }

  getEvent(): CalendarEvent {
    return this.event;
  }

  setAction(action: string) {
    this.action = action;
  }

  cancel() {
    this.activeModal.close({action: 'cancel', event: this.event});
  }

  delete(event: CalendarEvent<any>) {
    this.activeModal.close({ event, action: 'delete' });
  }
}
