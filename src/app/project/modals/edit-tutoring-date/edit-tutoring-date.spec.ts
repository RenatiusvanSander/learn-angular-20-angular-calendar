import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTutoringDate } from './edit-tutoring-date';

describe('EditTutoringDate', () => {
  let component: EditTutoringDate;
  let fixture: ComponentFixture<EditTutoringDate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTutoringDate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTutoringDate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
