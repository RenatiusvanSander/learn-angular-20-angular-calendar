import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTutoringDate } from './create-tutoring-date';

describe('CreateTutoringDate', () => {
  let component: CreateTutoringDate;
  let fixture: ComponentFixture<CreateTutoringDate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTutoringDate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTutoringDate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
