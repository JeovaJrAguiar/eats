import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrinho',
  imports: [CommonModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {

  // Itens no carrinho
  cartItems = [
    {
      name: 'Pizza Margherita',
      price: 30,
      quantity: 2,
      image: 'https://rossopizza.com.br/salao/wp-content/uploads/2019/09/istock-181175167.jpg',
    },
    {
      name: 'Açaí Bowl',
      price: 15,
      quantity: 1,
      image: 'https://theallnaturalvegan.com/wp-content/uploads/2023/09/vegan-acai-bowl-featured-image-1.jpg',
    }
  ];

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
  }

  // Lógica para finalizar a compra (aqui você pode redirecionar para uma página de checkout, por exemplo)
  proceedToCheckout(): void {
    alert('Finalizando a compra...');
    // Aqui você pode redirecionar para outra página
  }
}