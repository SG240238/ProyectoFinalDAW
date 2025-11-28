import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from './services/product.service';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    HeaderComponent,
    SliderComponent,
    FormsModule,
    CommonModule
  ]
})
export class AppComponent implements OnInit {
  searchText = '';
  year = new Date().getFullYear();
  products: Product[] = [];
  allProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.products = data;
        this.extractCategories();
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  extractCategories(): void {
    const uniqueCategories = new Set(this.allProducts.map(p => p.category));
    this.categories = Array.from(uniqueCategories).sort();
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onSearch(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = this.allProducts;

    // Filtrar por categoría
    if (this.selectedCategory !== '') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    // Filtrar por texto de búsqueda
    if (this.searchText.trim() !== '') {
      const searchLower = this.searchText.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(searchLower));
    }

    this.products = filtered;
  }

  get categoryName(): string {
    return this.selectedCategory === '' ? 'Todos' : this.selectedCategory;
  }
}

// alias requerido por main.server / main.ts si esos esperan "App"
export { AppComponent as App };

