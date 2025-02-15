import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Toast} from 'primeng/toast';
import {Order, OrderStatus} from '../../shared/models';
import {OrderService} from '../../shared/services';
import {StorageService} from '../../core/services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-carrinho',
  imports: [CommonModule, Toast],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit{

  cartItems: any[] = [];

  amount = 0;

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
    this.loadCartFromLocalStorage();

    for (const item of this.cartItems) {
      if (item && item.prato && item.prato.valor) {
        this.amount += item.prato.valor;
      }
    }
    this.amount = parseFloat(this.amount.toFixed(2));
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
    this.amount -= item.prato.valor;
    this.saveCartToLocalStorage();
  }

  proceedToCheckout(): void {
    const order: Order = {
      description: this.cartItems.map(item => item.prato.nome).join(', '),
      value: this.amount,
    };

    this.storageService.setItem('order', JSON.stringify(order));

    this.router.navigate(['/checkin']);
  }
  saveCartToLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(this.cartItems));
  }
}
