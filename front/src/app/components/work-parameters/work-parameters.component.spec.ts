import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkParametersComponent } from './work-parameters.component';

describe('WorkParametersComponent', () => {
  let component: WorkParametersComponent;
  let fixture: ComponentFixture<WorkParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkParametersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
