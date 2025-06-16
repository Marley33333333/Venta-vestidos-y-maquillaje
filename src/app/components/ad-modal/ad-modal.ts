import { Component } from '@angular/core';
import { AdService } from '../../services/ad-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ad-modal',
  imports: [CommonModule],
  templateUrl: './ad-modal.html',
  styleUrl: './ad-modal.scss',
  standalone: true
})
export class AdModal {

  showModal = false;

  constructor(private adService: AdService) {}
  
  ngOnInit(): void {
    this.adService.showAd$.subscribe(() => {
      this.showModal = true;
    });
  }

  closeAd() {
    this.showModal = false;
    this.adService.startTimer(); // Reinicia el temporizador
  }

}
