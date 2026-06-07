import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTutoringDate } from './update-tutoring-date';

describe('UpdateTutoringDate', () => {
  let component: UpdateTutoringDate;
  let fixture: ComponentFixture<UpdateTutoringDate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateTutoringDate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTutoringDate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
