import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreMockService} from '../../shared/services';

@Component({
  selector: 'app-quiosque',
  imports: [CommonModule],
  templateUrl: './quiosque.component.html',
  styleUrls: ['./quiosque.component.css']
})

export class QuiosqueComponent implements OnInit {
  title = 'Quiosques Disponíveis';

  modalAberto = false;

  quiosqueSelecionado: any = null;

  quiosques: any[] = [];

  constructor(private storeService: StoreMockService) { }

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

  adicionarAoCarrinho(prato: any) {
    alert(`${prato.nome} foi adicionado ao carrinho!`);
  }
}
