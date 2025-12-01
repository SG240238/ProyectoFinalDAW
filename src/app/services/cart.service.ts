import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Producto } from './product.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private productos: Producto[] = [];
  private cambioCarrito = new Subject<void>();
  cambioCarrito$ = this.cambioCarrito.asObservable();

  private notificarCambio(): void {
    this.cambioCarrito.next();
  }

  agregarProducto(producto: Producto): void {
    const existente = this.productos.find(p => p.id === producto.id);
    if (existente) {
      existente.cantidad = (existente.cantidad ?? 0) + (producto.cantidad ?? 1);
    } else {
      this.productos.push({ ...producto, cantidad: producto.cantidad ?? 1 });
    }
    this.guardarEnLocalStorage();
    this.notificarCambio();
  }

  eliminarProducto(id: number): void {
    this.productos = this.productos.filter(p => p.id !== id);
    this.guardarEnLocalStorage();
    this.notificarCambio();
  }

  actualizarCantidades(id: number, cantidad: number): void {
    const producto = this.productos.find(p => p.id === id);
    if (producto) {
      producto.cantidad = Math.max(1, Math.floor(cantidad));
      this.guardarEnLocalStorage();
      this.notificarCambio();
    }
  }

  calcularTotal(): number {
    return this.productos.reduce((total, p) => {
      const qty = p.cantidad ?? 1;
      return total + (p.price * qty);
    }, 0);
  }

  getProductos(): Producto[] {
    return this.productos;
  }

  guardarEnLocalStorage(): void {
    localStorage.setItem('carrito', JSON.stringify(this.productos));
  }

  cargarDesdeLocalStorage(): void {
    const datos = localStorage.getItem('carrito');
    if (datos) {
      try {
        this.productos = JSON.parse(datos) ?? [];
      } catch {
        this.productos = [];
      }
    }
  }

  vaciar(): void {
    this.productos = [];
    this.guardarEnLocalStorage();
    this.notificarCambio();
  }
}