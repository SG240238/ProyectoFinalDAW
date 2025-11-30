import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Producto } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Output() cerrar = new EventEmitter<void>();

  productos: Producto[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cargarDesdeLocalStorage();
    this.sync();
    this.cartService.cambioCarrito$.subscribe(() => this.sync());
  }

  sync(): void {
    this.productos = this.cartService.getProductos();
    this.total = this.cartService.calcularTotal();
  }

  actualizar(producto: Producto): void {
    this.cartService.actualizarCantidades(producto.id, producto.cantidad ?? 1);
    this.sync();
  }

  eliminar(id: number): void {
    this.cartService.eliminarProducto(id);
    this.sync();
  }

  pagar(): void {
    alert('Pagar: funcionalidad pendiente de conexión');
  }

  cerrarModal(): void {
    this.cerrar.emit();
  }
}