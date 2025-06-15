import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule  } from '@angular/router';
import { ProductoService } from '../../../services/producto';
import { CarritoService } from '../../../services/carrito';
import { Producto, Categoria } from '../../../models/producto.interface';


@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
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

  
  currentSlide = 0;
  isMenuOpen = false;
  private slideInterval: any;

  private readonly productoService = inject(ProductoService);
  
  productos: Producto[] = [];
  loading = false;
  error: string | null = null;
  cantidadProductos: number = 0;
  productosFiltrados: Producto[] = [];
  categorias: Categoria[] = []; 
  showAboutUs = false;
  categoryFilter: string | null = null;
  categoriasUnicas: Categoria[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.startSlideShow();
    this.cargarProductos();
    this.carritoService.carrito$.subscribe((productos: Producto[]) => {
    this.cantidadProductos = productos.length;
  });
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

  filteredProducts(categoria: Categoria) {
    this.productosFiltrados = this.productos.filter((p: Producto) => p.categoria.idCategoria === categoria.idCategoria);
  }

  filterByCategory(category: string | null): void {
    this.categoryFilter = category;

    if (!category) {
      // Si no hay filtro, mostramos todos
      this.productosFiltrados = this.productos;
    } else {
      // Filtramos por nombre de categoría
      this.productosFiltrados = this.productos.filter(
        (p) => p.categoria.nombreCategoria === category
      );
    }

    window.scrollTo({ top: 500, behavior: 'smooth' });
  }

  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregarProducto(producto);
  }

  cargarProductos(): void {
    this.loading = true;
    this.error = null;
    
    this.productoService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.productosFiltrados = productos; // <- Aquí actualizamos productosFiltrados
        this.loading = false;
        this.categoriasUnicas = this.getCategoriasUnicas;
      },
      error: (error) => {
        this.error = 'Error al cargar los productos';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  get getCategoriasUnicas(): Categoria[] {
    return this.productos.reduce((categorias: Categoria[], producto: Producto) => {
      if (!categorias.some(c => c.idCategoria === producto.categoria.idCategoria)) {
        categorias.push(producto.categoria);
      }
      return categorias;
    }, []);
  }
  
  calcularPrecioConVariacion(producto: Producto, variacion: any): number {
    return producto.precioBase + variacion.precioAdicional;
  }
  
  onImageError(event: any): void {
    event.target.src = 'assets/images/placeholder-product.jpg';
  }

  toggleAboutUs(): void {
    this.showAboutUs = !this.showAboutUs;
    window.scrollTo({ top: 500, behavior: 'smooth' });
  }

}
