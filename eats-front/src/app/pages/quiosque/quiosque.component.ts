import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-quiosque',
  imports: [CommonModule],
  templateUrl: './quiosque.component.html',
  styleUrls: ['./quiosque.component.css']
})

export class QuiosqueComponent {
  title = 'Quiosques Disponíveis';

  quiosques = [
    {
      nome: 'Quiosque do João',
      imagem: 'https://via.placeholder.com/100',
      descricao: 'Melhores petiscos da praia!',
      situacao: 'Aberto',
      distancia: 2.5,
      pratos: [
        { nome: 'Espetinho de Camarão', preco: 12.99 },
        { nome: 'Cerveja Gelada', preco: 6.50 }
      ]
    },
    // Adicione mais quiosques aqui...
  ];

  modalAberto = false;
  quiosqueSelecionado: any = null;

  abrirModal(quiosque: any) {
    this.quiosqueSelecionado = quiosque;
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  adicionarAoCarrinho(prato: any) {
    alert(`${prato.nome} foi adicionado ao carrinho!`);
  }
}