import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionExpire {

  private timeoutId: any;
  private readonly IDLE_TIME = 10_000; // 10 segundos
  sessionExpired = new Subject<void>()

  constructor(
    private auth: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  startWatching(): void {
    this.resetTimer();

    ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']
      .forEach(event =>
        window.addEventListener(event, () => this.resetTimer())
      );
  }

  stopWatching(): void {
    clearTimeout(this.timeoutId);
  }

  private resetTimer(): void {
    clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      this.ngZone.run(() => {
        this.sessionExpired.next()
      });
    }, this.IDLE_TIME);
  }
}