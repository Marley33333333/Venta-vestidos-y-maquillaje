import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Ad {
  id: number;
  type: 'image' | 'video' | 'text';
  contentUrl?: string; // URL de imagen o video
  message?: string;
  title?: string; // Título opcional para anuncios de imagen
}

@Injectable({
  providedIn: 'root'
})
export class AdService {

  private ads: Ad[] = [
    {
      id: 1,
      type: 'image',
      contentUrl: 'assets/welcome.jpeg', // Ruta a la imagen local
      title: "Bienvenido a Lumina Beauty"
    },
    {
      id: 2,
      type: 'video',
      contentUrl: 'assets/advideo.mp4', // Ruta al video local
      title: "Nuestos productos"
    },
    {
      id: 3,
      type: 'image',
      contentUrl: 'assets/logo.jpeg', // Ruta a la imagen local
      title: "Una historia de belleza"
    },
    {
      id: 4,
      type: 'text',
      message: '¡Bienvenido a Lumina Beauty! Descuentos exclusivos por tiempo limitado.',
      title: "Eres parte de nuestra historia"
    }
  ];


  private showAdSubject = new Subject<Ad>();
  public showAd$ = this.showAdSubject.asObservable();
  
  private timer: any;
  private disabled = false;
  private delay = 60000;
  
  constructor() {
     this.startTimer();
  }

  startTimer(delay = this.delay) { 
    if (this.disabled) return; // No iniciar si está deshabilitado

    this.clearTimer(); // Limpiar si ya existe

    const randomAd = this.ads[Math.floor(Math.random() * this.ads.length)];

    this.timer = setTimeout(() => {
      this.showAdSubject.next(randomAd);
    }, delay);
  }

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }  

  disableAds() {
    this.disabled = true;
    this.clearTimer();
  }

  enableAds(delay = this.delay) {
    this.disabled = false;
    this.delay = delay;
    this.startTimer(delay);
  }

  prolongAds(delay = 20000) {
    this.startTimer(delay);
  }

}
