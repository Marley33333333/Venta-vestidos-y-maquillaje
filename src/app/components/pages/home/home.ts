import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
 // Datos del carrusel
  slides = [
    {
      image: 'https://i.ibb.co/yFYL3WMF/slider-1.png',
      alt: 'Promoción de vestidos',
      caption: '¡Vestidos con hasta 50% de descuento!'
    },
    {
      image: 'https://i.ibb.co/6JPKFxNv/slider-2.png',
      alt: 'Nueva línea de cosméticos',
      caption: 'Descubre nuestra nueva línea de cosméticos'
    },
    {
      image: 'https://i.ibb.co/Hpkt4Mpm/slider-3.png',
      alt: 'Envío gratis',
      caption: 'Envío gratis en compras superiores a $50'
    }
  ];

  // Datos de los productos
  products = [
    { id: 1, name: 'Vestido Floral', price: 45.99, image: 'https://i.ibb.co/BHkQSf0G/Whats-App-Image-2025-05-31-at-23-11-19-2.jpg', alt: 'Vestido floral' },
    { id: 2, name: 'Labial Mate', price: 12.99, image: 'https://i.ibb.co/TxLSyXdc/17195954-0-product-515-Wx772-H.jpg', alt: 'Labial mate' },
    { id: 3, name: 'Vestido Elegante', price: 59.99, image: 'https://i.ibb.co/84QGMQrR/Gemini-Generated-Image-bmnsn4bmnsn4bmns.png', alt: 'Vestido elegante' },
    { id: 4, name: 'Paleta de Sombras', price: 24.99, image: 'https://i.ibb.co/x8Lj9QkR/Whats-App-Image-2025-05-31-at-23-11-19.jpg', alt: 'Paleta de sombras' }
  ];

  currentSlide = 0;
  isMenuOpen = false;
  private slideInterval: any;

  ngOnInit() {
    this.startSlideShow();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Cambia cada 5 segundos
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide === 0) ? this.slides.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide === this.slides.length - 1) ? 0 : this.currentSlide + 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
