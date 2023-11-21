import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playerSubject = new Subject<boolean>()
  public player$ = this.playerSubject.asObservable();

  constructor() { }

  public startPlayer(): void {
    this.playerSubject.next(true);
  }
}
