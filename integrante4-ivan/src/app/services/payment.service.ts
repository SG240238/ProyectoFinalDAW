import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() {}

  pagar() {
    alert("Compra realizada con éxito");
    localStorage.removeItem("carrito");
  }
}
