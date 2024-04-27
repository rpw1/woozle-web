import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playerSubject = new Subject<boolean>()
  public player$ = this.playerSubject.asObservable();

  private isActive = false;

  constructor() { }

  public togglePlayer(): void {
    this.isActive = !this.isActive;
    this.playerSubject.next(this.isActive);
  }
}
