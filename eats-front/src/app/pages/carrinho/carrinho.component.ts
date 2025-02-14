import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-carrinho',
  imports: [CommonModule, Toast],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit{

  cartItems: any[] = [];

  amount = 0;

  ngOnInit() {
    this.loadCartFromLocalStorage();

    for (const item of this.cartItems) {
      if (item && item.prato && item.prato.valor) {
        this.amount += item.prato.valor;
      }
    }
    console.log(this.amount);
  }

  loadCartFromLocalStorage() {
    const carrinhoString = localStorage.getItem('carrinho');
    this.cartItems = carrinhoString ? JSON.parse(carrinhoString) : [];
  }

  // Calcula o valor total
  get totalAmount(): number {

    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Aumenta a quantidade de um item
  increaseQuantity(item: any): void {
    item.quantity++;
  }

  // Diminui a quantidade de um item
  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  // Remove um item do carrinho
  removeItem(item: any): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
    this.saveCartToLocalStorage();
  }

  // Lógica para finalizar a compra (aqui você pode redirecionar para uma página de checkout, por exemplo)
  proceedToCheckout(): void {
    alert('Finalizando a compra...');
    // Aqui você pode redirecionar para outra página
  }

  saveCartToLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(this.cartItems));
  }
}
