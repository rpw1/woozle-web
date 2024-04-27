import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class ProgressBarEffects {

  private action$ = inject(Actions);


}