import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTutoringDate } from './delete-tutoring-date';

describe('DeleteTutoringDate', () => {
  let component: DeleteTutoringDate;
  let fixture: ComponentFixture<DeleteTutoringDate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteTutoringDate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTutoringDate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
