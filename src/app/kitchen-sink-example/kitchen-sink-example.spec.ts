import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenSinkExample } from './kitchen-sink-example';

describe('KitchenSinkExample', () => {
  let component: KitchenSinkExample;
  let fixture: ComponentFixture<KitchenSinkExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KitchenSinkExample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitchenSinkExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
