import { inject, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SolutionModalComponent } from '../components/solution-modal/solution-modal.component';

@Injectable({
  providedIn: 'root'
})
export class SolutionModalService {

  private readonly modalService = inject(NgbModal);

  async open(): Promise<void> {
    const modalRef = this.modalService.open(SolutionModalComponent);
    await modalRef.result
  }
}
