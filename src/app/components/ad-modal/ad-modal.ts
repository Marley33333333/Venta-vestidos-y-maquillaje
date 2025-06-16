import { Component } from '@angular/core';
import { AdService } from '../../services/ad-service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ad-modal',
  imports: [CommonModule],
  templateUrl: './ad-modal.html',
  styleUrl: './ad-modal.scss',
  standalone: true
})
export class AdModal {

  showModal = false;
  currentAd: any = null;
  safeVideoUrl!: SafeResourceUrl;
  showOptions = false;

  constructor(private adService: AdService,  private sanitizer: DomSanitizer) {}
  
  ngOnInit(): void {
    this.adService.showAd$.subscribe(ad => {
      this.currentAd = ad; 

      if (this.currentAd?.type === 'video' && this.currentAd.contentUrl) {
        this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentAd.contentUrl);
      }

      this.showModal = true;
    });
  }

  closeAd(option?: 'disable' | 'prolong') {
    this.showModal = false;

    if (option === 'disable') {
      this.adService.disableAds(); // Deshabilita los anuncios
    } else if (option === 'prolong') {
      this.adService.prolongAds(20000); // Prolonga el anuncio actual
    } else {
      this.adService.startTimer(); // Reinicia el temporizador
    }

    this.showOptions = true; // Oculta las opciones al cerrar el anuncio

    setTimeout(() => {
      this.showOptions = false; // Oculta las opciones después de 2 segundos  
    }, 5000);
  }

}
