import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateUserAssingmentComponent } from './rate-user-assingment.component';

describe('RateUserAssingmentComponent', () => {
  let component: RateUserAssingmentComponent;
  let fixture: ComponentFixture<RateUserAssingmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateUserAssingmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RateUserAssingmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
