import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { GuessType } from '../../models/guess-type';
import { GuessComponent } from './guess.component';
import { provideMockStore } from '@ngrx/store/testing'
import { initialState } from '../../state/reducers/game.reducer';
import { deepClone } from 'fast-json-patch';
import { CommonModule } from '@angular/common';

describe('GuessComponent', () => {
  let component: GuessComponent;
  let fixture: ComponentFixture<GuessComponent>;
  const state = deepClone(initialState)

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
      ReactiveFormsModule,
      GuessComponent,
      CommonModule
    ],
    providers: [
      provideMockStore(state)
    ]
  }).compileComponents();

    fixture = TestBed.createComponent(GuessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
