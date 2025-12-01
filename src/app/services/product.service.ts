import { Injectable } from '@angular/core';

export interface Producto {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image: string;
  cantidad?: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  // Reemplazá la URL por tu API si es necesario
  private url = 'https://fakestoreapi.com/products';

  async getProductos(): Promise<Producto[]> {
    const res = await fetch(this.url);
    const data = await res.json();
    // Aseguramos el tipo y que venga sin cantidad por defecto
    return (data as Producto[]).map(p => ({ ...p, cantidad: 0 }));
  }
}