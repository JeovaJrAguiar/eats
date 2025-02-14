import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkin',
  imports: [CommonModule],
  templateUrl: './checkin.component.html',
  styleUrl: './checkin.component.css'
})

export class CheckinComponent {

  totalCompra: number = 50.00;  // Evita undefined
  saldoDisneyEats: number = 200.00; // Evita undefined

}
