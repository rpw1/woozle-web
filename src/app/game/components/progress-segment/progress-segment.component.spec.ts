import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressSegmentComponent } from './progress-segment.component';

describe('ProgressSegmentComponent', () => {
  let component: ProgressSegmentComponent;
  let fixture: ComponentFixture<ProgressSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressSegmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgressSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
