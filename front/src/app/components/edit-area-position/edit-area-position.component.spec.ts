import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAreaPositionComponent } from './edit-area-position.component';

describe('EditAreaPositionComponent', () => {
  let component: EditAreaPositionComponent;
  let fixture: ComponentFixture<EditAreaPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAreaPositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAreaPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
