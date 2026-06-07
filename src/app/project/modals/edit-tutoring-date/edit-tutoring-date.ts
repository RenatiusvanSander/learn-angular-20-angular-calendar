import { Component, inject } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { ColorsHelper } from '../../helpers/colors-helper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-tutoring-date',
  standalone: false,
  templateUrl: './edit-tutoring-date.html',
  styleUrl: './edit-tutoring-date.css',
})
export class EditTutoringDate {

    resolveColor(event: CalendarEvent<any>, colorType: string): any {
    return ColorsHelper.resolveColor(event, colorType);
  }

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

  save(event: CalendarEvent<any>) {
    this.activeModal.close({ event, action: 'save' });
  }

}
