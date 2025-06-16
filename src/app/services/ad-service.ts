import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  private showAdSubject = new Subject<void>();
  public showAd$ = this.showAdSubject.asObservable();
  
  private timer: any;
  
  constructor() {
     this.startTimer();
  }

  startTimer(delay: number = 10000) { // por defecto cada 10 segundos
    this.clearTimer(); // Limpiar si ya existe
    this.timer = setTimeout(() => {
      this.showAdSubject.next();
    }, delay);
  }

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }  

}
