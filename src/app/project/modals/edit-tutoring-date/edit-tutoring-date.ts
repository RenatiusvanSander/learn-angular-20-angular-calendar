import { Component, inject } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { ColorsHelper } from '../../helpers/colors-helper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceContract } from '../../models/service-contract';

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

  event!: CalendarEvent;

  action!: string;

  selectedServiceContractId!: number;

  serviceContracts: Array<ServiceContract> = new Array<ServiceContract>();

  constructor() {
  }

  setEvent(event: CalendarEvent) {
    this.event = event;
    this.selectedServiceContractId = event.meta.serviceContractId;
  }

  getEvent(): CalendarEvent {
    return this.event;
  }

  setAction(action: string) {
    this.action = action;
  }

  setContractServices(serviceContracts: Array<ServiceContract>) {
    this.serviceContracts = serviceContracts;
  }

  save(event: CalendarEvent<any>) {
    this.activeModal.close({ event, action: 'save' });
  }

    onChangeUpdateAppointmentServiceContract(event: any) {
    const selectedIndex = event.selectedIndex;
    
    if (selectedIndex !== -1) {
      this.event.meta.serviceContractId = +event[selectedIndex].id;
    }
  }
}
