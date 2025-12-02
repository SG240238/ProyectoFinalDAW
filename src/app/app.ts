import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductListComponent, CartComponent],
  template: `
    <div class="app-container">
      <div class="carrito-icono" (click)="mostrarCarrito()">
        🛒 <span class="contador">{{ cantidadCarrito }}</span>
      </div>

      <h1 class="titulo">🛍️ Bienvenidos a UrbanStore</h1>

      <app-product-list></app-product-list>

      <app-cart
        *ngIf="mostrarCarritoModal"
        (cerrar)="mostrarCarritoModal = false">
      </app-cart>
    </div>
  `,
  styleUrls: ['./app.css']
})
export class AppComponent {
  cantidadCarrito = 0;
  mostrarCarritoModal = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cargarDesdeLocalStorage();
    this.actualizarCantidad();

    this.cartService.cambioCarrito$.subscribe(() => {
      this.actualizarCantidad();
    });
  }

  actualizarCantidad(): void {
    this.cantidadCarrito = this.cartService.getProductos()
      .reduce((total, p) => total + (p.cantidad ?? 1), 0);
  }

  mostrarCarrito(): void {
    this.mostrarCarritoModal = true;
  }
}