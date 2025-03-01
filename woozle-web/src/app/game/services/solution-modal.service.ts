import { inject, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SolutionModalComponent } from '../components/solution-modal/solution-modal.component';
import { Store } from '@ngrx/store';
import { Game } from '../state/models/game.model';
import { GameActions } from '../state/actions/game.actions';

@Injectable({
  providedIn: 'root'
})
export class SolutionModalService {

  private readonly modalService = inject(NgbModal);
  private readonly gameStore = inject(Store<Game>);

  async open(): Promise<void> {
    const modalRef = this.modalService.open(SolutionModalComponent);
    modalRef.result.then(result => {
      if (result) {
        this.gameStore.dispatch(GameActions.reset())
      }
    }).catch(() => this.gameStore.dispatch(GameActions.reset()));
  }
}
