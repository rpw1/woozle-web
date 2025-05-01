import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast } from '../models/toast';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _toasts: Toast[] = [];
  private readonly toasts = new Subject<Toast[]>();
  readonly toasts$ = this.toasts.asObservable();
  private readonly delay = 5000;

  showSuccess(message: string) {
    const toast: Toast = {
      id: v4(),
      message: message,
      classes: 'bg-success text-light',
      delay: this.delay
    }

    this._toasts.push(toast);
    this.toasts.next(this._toasts);
  }

  showError(message: string) {
    const toast: Toast = {
      id: v4(),
      message: message,
      classes: 'bg-danger text-light',
      delay: this.delay
    }

    this._toasts.push(toast);
    this.toasts.next(this._toasts);
  }

  remove(id: string) {
    this._toasts = this._toasts.filter(x => x.id !== id);
    this.toasts.next(this._toasts);
  }
}
