import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreMockService} from '../../shared/services';
import {User} from '../../shared/models';

// Importação correta do PrimeNG ToastModule
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-quiosque',
  imports: [CommonModule, ToastModule],
  templateUrl: './quiosque.component.html',
  styleUrls: ['./quiosque.component.css']
})

export class QuiosqueComponent implements OnInit {
  title = 'Quiosques Disponíveis';

  modalAberto = false;

  quiosqueSelecionado: any = null;

  quiosques: any[] = [];

  constructor(private storeService: StoreMockService, private messageService: MessageService) { }

  ngOnInit() {
    this.quiosques = this.storeService.getStores().map(quiosque => ({
      ...quiosque,
      imagem: 'https://www.burgerfoods.com.br/wp-content/uploads/2023/01/b7e870fe16253b03d4f5e4eca7c887cf_XL.jpg' // Imagem mockada
    }));
  }

  abrirModal(quiosque: any) {
    this.quiosqueSelecionado = quiosque;
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  adicionarAoCarrinho(prato: any ) {
    let user = { name: '', email: '' } as User;
    //const quiosque = this.encontrarQuiosqueComPrato(this.quiosques, prato.nome);
    const carrinhoString = localStorage.getItem('carrinho');
    let carrinho: any[] = carrinhoString ? JSON.parse(carrinhoString) : [];

    carrinho.push(prato);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    this.messageService.add({
      severity: 'success',
      summary: 'Adicionado!',
      detail: 'Prato adicionado ao carrinho.',
      life: 3000
    });
  }

  encontrarQuiosqueComPrato(quiosques: any[], nomePrato: string): any | undefined {
    for (const quiosque of quiosques) {
      if (quiosque.pratos && quiosque.pratos.length > 0) {
        for (const prato of quiosque.pratos) {
          if (prato.nome.toLowerCase() === nomePrato.toLowerCase()) {
            return quiosque;
          }
        }
      }
    }
    return undefined;
  }
}
