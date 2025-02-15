import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../shared/models';
import { StorageService } from '../../core/services';
import { OrderService } from '../../shared/services';

@Component({
  selector: 'app-checkin',
  imports: [CommonModule],
  templateUrl: './checkin.component.html',
  styleUrl: './checkin.component.css'
})
export class CheckinComponent implements OnInit {
  order: Order | null = null;
  totalCompra: number = 0;
  saldoDisneyEats: number = 200.00;

  constructor(
    private storageService: StorageService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    const orderString = this.storageService.getItem('order');
    if (orderString) {
      this.order = JSON.parse(orderString);
      this.totalCompra = this.order ? this.order.value : 0;
    }
  }

  finalizarPagamento() {
    if (this.order) {
      this.orderService.createOrder(this.order).subscribe({
        next: (response) => {
          alert('Pedido criado com sucesso!');
          this.storageService.setItem('order', '');
          this.order = null;
          this.totalCompra = 0
        },
        error: (error) => {
          console.error('Erro ao criar pedido:', error);
          alert('Erro ao criar pedido. Tente novamente mais tarde.');
        }
      });
    }
  }
}
