import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../shared/models';
import { StorageService } from '../../core/services';
import { OrderService } from '../../shared/services';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-checkin',
  imports: [CommonModule],
  templateUrl: './checkin.component.html',
  styleUrl: './checkin.component.css'
})
export class CheckinComponent {
  orders: Order[] = [];
  loading: boolean = true;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.orderService.fetchOrders().subscribe({
      next: (orders: Order[]) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar pedidos:', error);
        this.loading = false;
        alert('Erro ao carregar pedidos. Tente novamente mais tarde.');
      }
    });
  }

  formatCurrency(value: number): string {
    return value.toFixed(2);
  }
}
