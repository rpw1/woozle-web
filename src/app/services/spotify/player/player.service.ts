import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playerSubject = new Subject<never>()
  public player$ = this.playerSubject.asObservable();

  constructor() { }

  public togglePlayer(): void {
    this.playerSubject.next();
  }
}
