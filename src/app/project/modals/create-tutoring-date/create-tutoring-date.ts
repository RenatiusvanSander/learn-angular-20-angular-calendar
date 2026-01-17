import { Component, inject} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-create-tutoring-date',
  standalone: false,
  templateUrl: './create-tutoring-date.html',
  styleUrl: './create-tutoring-date.css',
})
export class CreateTutoringDate {

  activeModal: NgbActiveModal = inject(NgbActiveModal);

  event!: CalendarEvent<any>;

  action!: string;

  constructor() {
  }

  setEvent(event: CalendarEvent<any>) {
    this.event = event;
  }

  getEvent(): CalendarEvent<any> {
    return this.event;
  }

  setAction(action: string) {
    this.action = action;
  }

}
