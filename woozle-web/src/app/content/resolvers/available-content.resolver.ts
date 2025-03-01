import { ResolveFn } from '@angular/router';
import { Content } from '../state/models/content';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { ContentActions } from '../state/actions/content.actions';

export const availableContentResolver: ResolveFn<boolean> = (route, state) => {
  const contentStore = inject(Store<Content>);
  contentStore.dispatch(ContentActions.loadContent());
  contentStore.dispatch(ContentActions.resetAvailableContentFilters());
  return true;
};
