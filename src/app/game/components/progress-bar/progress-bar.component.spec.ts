import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { deepClone } from 'fast-json-patch';
import { MockComponent } from 'ng-mocks';
import { initialState } from '../../state/reducers/game.reducer';
import { ProgressSegmentComponent } from '../progress-segment/progress-segment.component';
import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;
  const state = deepClone(initialState)

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ProgressBarComponent],
    declarations: [
      MockComponent(ProgressSegmentComponent)
    ],
    providers: [
      provideMockStore(state)
    ]
})
    .compileComponents();

    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
