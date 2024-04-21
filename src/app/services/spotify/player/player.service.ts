import { Injectable } from '@angular/core';
import { NEVER, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playerSubject = new Subject<boolean>()
  public player$ = this.playerSubject.asObservable();

  constructor() { }

  public togglePlayer(): void {
    this.playerSubject.next(true);
  }
}
