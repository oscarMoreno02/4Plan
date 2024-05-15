import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWorkDayRatesComponent } from './list-work-day-rates.component';

describe('ListWorkDayRatesComponent', () => {
  let component: ListWorkDayRatesComponent;
  let fixture: ComponentFixture<ListWorkDayRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListWorkDayRatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListWorkDayRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
