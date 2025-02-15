import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Toast} from 'primeng/toast';
import {Order, OrderStatus} from '../../shared/models';
import {OrderService} from '../../shared/services';
import {StorageService} from '../../core/services';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-carrinho',
  imports: [CommonModule, Toast],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit{

  cartItems: any[] = [];

  cartItemsPending: any[] = [];

  amount = 0;

  constructor(private router: Router, private orderService: OrderService,  private messageService: MessageService) { }

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
    const orderString = localStorage.getItem('order');
    this.cartItemsPending = orderString ? JSON.parse(orderString) : [];
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

    this.orderService.createOrder(order).subscribe({
      next: (response) => {
        alert('Pedido criado com sucesso!');
        localStorage.setItem('carrinho', '');
        this.cartItems = [];
        this.amount = 0;

        localStorage.setItem('order', JSON.stringify(response));
      },
      error: (error) => {
        console.error('Erro ao criar pedido:', error);
        alert('Erro ao criar pedido. Tente novamente mais tarde.');
      }
    });

    //this.router.navigate(['/checkin']);
    this.messageService.add({
      severity: 'success',
      summary: 'Adicionado!',
      detail: 'Pedido realizad.',
      life: 3000
    });
  }
  saveCartToLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(this.cartItems));
  }
}
