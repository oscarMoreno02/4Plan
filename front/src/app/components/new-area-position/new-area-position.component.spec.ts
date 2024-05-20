import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAreaPositionComponent } from './new-area-position.component';

describe('NewAreaPositionComponent', () => {
  let component: NewAreaPositionComponent;
  let fixture: ComponentFixture<NewAreaPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAreaPositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewAreaPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
