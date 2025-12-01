import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Producto, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productos: Producto[] = [];
  filtro = '';
  selectedCategory = '';
  categories: string[] = [];
  selectedProduct: Producto | null = null;

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.productService.getProductos().then(data => {
      this.productos = data;
      // Extraer categorías únicas
      this.categories = [...new Set(data.map(p => p.category).filter(c => c !== undefined))] as string[];
      console.log('Productos cargados:', this.productos.length);
      this.cdr.detectChanges();
    }).catch(error => {
      console.error('Error al cargar productos:', error);
      this.productos = []; // fallback
    });
  }

  onSearch(): void {
    this.filtro = this.filtro.trim();
  }

  onCategoryChange(): void {
    // El filtrado se aplica automáticamente en el método filtrar
  }

  filtrar(lista: Producto[]): Producto[] {
    let result = lista;

    // Filtrar por categoría
    if (this.selectedCategory) {
      result = result.filter(p => p.category === this.selectedCategory);
    }

    // Filtrar por texto de búsqueda
    const q = this.filtro.trim().toLowerCase();
    if (q) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.description ?? '').toLowerCase().includes(q)
      );
    }

    return result;
  }

  mostrarDetalle(producto: Producto): void {
    this.selectedProduct = producto;
  }

  cerrarModalDetalle(): void {
    this.selectedProduct = null;
  }
}