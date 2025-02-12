import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-quiosque',
  imports: [CommonModule],
  templateUrl: './quiosque.component.html',
  styleUrls: ['./quiosque.component.css']
})

export class QuiosqueComponent {

  title = 'Quiosques próximos a você';

  quiosques = [
    {
      nome: 'Quiosque do Açai',
      descricao: 'O melhor açaí da cidade!',
      distancia: 0.5,
      situacao: 'Fechado',
      imagem: 'https://www.burgerfoods.com.br/wp-content/uploads/2023/01/b7e870fe16253b03d4f5e4eca7c887cf_XL.jpg'
    },
    {
      nome: 'Quiosque da Tapioca',
      descricao: 'Tapiocas frescas e deliciosas!',
      distancia: 1,
      situacao: 'Aberto',
      imagem: 'https://www.receiteria.com.br/wp-content/uploads/tapioca.jpeg'
    },
    {
      nome: 'Quiosque do Sorvete',
      descricao: 'Sorvetes artesanais incríveis!',
      distancia: 2.2,
      situacao: 'Aberto',
      imagem: 'https://receitadaboa.com.br/wp-content/uploads/2024/07/Imagem-ilustrativa-de-sorvete-de-morango.webp'
    }, 
  ];
}
