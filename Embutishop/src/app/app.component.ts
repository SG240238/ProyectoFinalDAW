import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { ProductsComponent } from './components/products/products.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    HeaderComponent,
    SliderComponent,
    ProductsComponent,
    FormsModule,
    CommonModule
  ]
})
export class AppComponent {
  searchText = '';
  year = new Date().getFullYear();

  // Productos con rutas de imagen locales en src/assets/img/
  products = [
    {
      id: 1,
      name: 'Jamón Ahumado',
      price: 19.99,
      desc: 'Jamón ahumado de alta calidad, perfecto para sándwiches y recetas.',
      category: 'Embutidos',
      image: 'src/assets/img/jamon.jpg'
    },
    {
      id: 2,
      name: 'Chorizo Tradicional',
      price: 24.50,
      desc: 'Chorizo con sazón tradicional, listo para asar o freír.',
      category: 'Embutidos',
      image: 'assets/img/chorizo.jpg'
    },
    {
      id: 3,
      name: 'Salchicha Artesanal',
      price: 14.75,
      desc: 'Salchicha artesanal, sabor suave y textura jugosa.',
      category: 'Embutidos',
      image: 'assets/img/salchicha.jpg'
    },
    {
      id: 4,
      name: 'Mortadela Selecta',
      price: 22.30,
      desc: 'Mortadela de receta clásica, ideal para tablas y bocadillos.',
      category: 'Embutidos',
      image: 'assets/img/mortadela.jpg'
    },
    {
      id: 5,
      name: 'Queso para Tabla',
      price: 12.90,
      desc: 'Queso cremoso perfecto para combinar con embutidos.',
      category: 'Lácteos',
      image: 'assets/img/queso.jpg'
    },
    {
      id: 6,
      name: 'Pack Embutidos',
      price: 49.99,
      desc: 'Selección premium: jamón, chorizo y salchicha en un pack.',
      category: 'Embutidos',
      image: 'assets/img/embutido-pack.jpg'
    }
  ];
}

// alias requerido por main.server / main.ts si esos esperan "App"
export { AppComponent as App };

