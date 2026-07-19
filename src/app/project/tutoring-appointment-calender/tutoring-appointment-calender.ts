import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  inject,
  OnInit
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { CreateTutoringDate } from '../modals/create-tutoring-date/create-tutoring-date';
import { CalendarEventHelper } from '../helpers/calendar-event-helper';
import { ColorsHelper } from '../helpers/colors-helper';
import { EditTutoringDate } from '../modals/edit-tutoring-date/edit-tutoring-date';
import { TutoringAppointmentDataService } from '../services/tutoring-appointment-data-service';
import { TutoringAppointmentMapperService } from '../services/tutoring-appointment-mapper-service';
import { ServiceContractService } from '../services/service-contract-service';
import { ServiceContract } from '../models/service-contract';

@Component({
  selector: 'tutoring-appointment-calender',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
  templateUrl: './tutoring-appointment-calender.html',
  styleUrl: './tutoring-appointment-calender.css',
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ]
})
export class TutoringAppointmentCalender implements OnInit {
  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  userId: number;

  refresh = new Subject<void>();
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  serviceContracts: Array<ServiceContract> = new Array<ServiceContract>();

  constructor(private appointmentDataService: TutoringAppointmentDataService, private appointmentMapper: TutoringAppointmentMapperService, private serviceContractService: ServiceContractService) {
    this.userId = 1;
  }

  async ngOnInit(): Promise<void> {
    const appointments = await this.appointmentDataService.getAppointmentsByUser(this.userId);
    this.events = this.appointmentMapper.convertTutoringAppointmentToAppointmentCalendarEventModel(appointments, this.actions);

    this.serviceContracts = await this.serviceContractService.getServiceContracts(this.userId);
  }

  events: Array<CalendarEvent> = new Array<CalendarEvent>();
  eventsToPersist: Array<CalendarEvent> = new Array<CalendarEvent>();
  activeDayIsOpen: boolean = true;
  openCreateTutoringDateModal: boolean = false;

  private modal = inject(NgbModal);

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    let action = '';
    this.openCreateTutoringDateModal = false;

    if (isSameMonth(date, this.viewDate)) {
      if(!isSameDay(this.viewDate, date) && (this.activeDayIsOpen === false) && (events.length === 0)) {
        this.activeDayIsOpen = true;
        this.openCreateTutoringDateModal = true;
      } else if ( (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ) {
        this.activeDayIsOpen = false;
        this.openCreateTutoringDateModal = events.length === 0 || events.length > 0;
        action = 'Create';
      } else if ( !isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) {
        this.activeDayIsOpen = events.length > 0 ? true : false;
        this.openCreateTutoringDateModal = events.length === 0;
        action = 'Create';
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;

      if(this.openCreateTutoringDateModal) {
        this.handleEvent(action, {} as CalendarEvent);

        if(this.activeDayIsOpen === false) {
          this.activeDayIsOpen = true;
        }
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  async handleEvent(action: string, event: CalendarEvent): Promise<void> {
    if(action === '') {
      return;
    }

    let result = undefined;

    switch(action) {
      case 'Clicked':
      case 'Edited':
        result = await this.openTutoringDateModal(EditTutoringDate, event, action, this.serviceContracts, event.meta.serviceContractId);
        break;
      case 'Create':
        result = await this.openTutoringDateModal(CreateTutoringDate, event, action, this.serviceContracts, -1);
        break;
      case 'Deleted':
        break;
      case 'Dropped or resized':
        break;
      default:
        break;
    }

    if(result !== undefined && result.action === 'save' && result.event !== undefined) {
      this.addEvent(result.event);
    }
  }

  async openTutoringDateModal(component: any, event: CalendarEvent, action: string, serviceContractsRef: Array<ServiceContract>, selectedServiceContractId: number): Promise<any> {
    const modalTutoringAppointmentCalenadar = this.modal.open(component, { size: 'lg' });
    modalTutoringAppointmentCalenadar.componentInstance.setEvent(event);
    modalTutoringAppointmentCalenadar.componentInstance.setAction(action);
    modalTutoringAppointmentCalenadar.componentInstance.setContractServices(serviceContractsRef);
    if(selectedServiceContractId > -1) {
      modalTutoringAppointmentCalenadar.componentInstance.setSelectedServiceContractId(selectedServiceContractId);
    }

    return await modalTutoringAppointmentCalenadar.result;
  }

  async addEvent(event?: CalendarEvent): Promise<void> {
    const indexToUpdate = this.events.findIndex(e => e.id === event?.id);

    if(indexToUpdate > 0) {
      const tutoringAppointment = this.appointmentMapper.convertAppointmentCalendarEventModelToTutoringAppointment([event])[0];
      const persistResult = await this.appointmentDataService.updateAppointment(tutoringAppointment);

      if(persistResult.tutoringAppointmentNo > 0) {
        this.events[indexToUpdate] = event!;
        this.refresh.next();
      }
    } else {
      const tutoringAppointment = this.appointmentMapper.convertAppointmentCalendarEventModelToTutoringAppointment([event])[0];
      const persistResult = await this.appointmentDataService.persistAppointment(tutoringAppointment);

      if(persistResult.tutoringAppointmentNo > 0) {
        event = this.appointmentMapper.convertSingleTutoringAppointmentToAppointmentCalendarEventModel(persistResult, this.actions);
        this.events.push(event);
        this.refresh.next();
      }
    }
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    this.events = this.events.filter((event) => event !== eventToDelete);
    this.refresh.next();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  resolveColor(event: CalendarEvent, colorType: string): string {
    return ColorsHelper.resolveColor(event, colorType);
  }

  openModal( component: any, event: CalendarEvent, action: string, serviceContracts: Array<ServiceContract>): Promise<any> {
    const modal = this.modal.open(component, { size: 'lg' });
      modal.componentInstance.setEvent(event);
      modal.componentInstance.setAction(action);
      modal.componentInstance.setContractServices(serviceContracts);

      return modal.result;
  }
}
