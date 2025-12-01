import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Producto } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  @Input() producto!: Producto;
  @Output() cerrar = new EventEmitter<void>();

  constructor(private cartService: CartService) {}

  agregarAlCarrito(): void {
    this.cartService.agregarProducto({ ...this.producto, cantidad: (this.producto.cantidad ?? 0) + 1 });
    this.cerrar.emit();
  }

  cancelar(): void {
    this.cerrar.emit();
  }
}