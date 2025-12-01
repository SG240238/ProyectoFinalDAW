import { Component, OnInit } from '@angular/core';
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
  selectedProduct: Producto | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProductos().then(data => {
      this.productos = data;
    }).catch(() => {
      this.productos = []; // fallback
    });
  }

  filtrar(lista: Producto[]): Producto[] {
    const q = this.filtro.trim().toLowerCase();
    if (!q) return lista;
    return lista.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.description ?? '').toLowerCase().includes(q)
    );
  }

  mostrarDetalle(producto: Producto): void {
    this.selectedProduct = producto;
  }

  cerrarModalDetalle(): void {
    this.selectedProduct = null;
  }
}