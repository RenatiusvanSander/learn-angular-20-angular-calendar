import { Component, inject} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent } from 'angular-calendar';
import { ColorsHelper } from '../../helpers/colors-helper';

@Component({
  selector: 'app-create-tutoring-date',
  standalone: false,
  templateUrl: './create-tutoring-date.html',
  styleUrl: './create-tutoring-date.css',
})
export class CreateTutoringDate {

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
