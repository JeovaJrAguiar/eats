import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  userName: string = '';

  constructor() {}

  categories = [
    { name: 'Comida', image: 'https://travel-guide.daytours4u.com/pt/wp-content/uploads/sites/4/2019/11/comidaperuana1.jpg' },
    { name: 'Supermercados', image: 'https://www.sde.ce.gov.br/wp-content/uploads/sites/15/2022/06/240502680_4608349989189306_5484089748816698579_n.jpg' },
    { name: 'Farmácias', image: 'https://revistadafarmacia.com.br/wp-content/uploads/2021/06/Farmacia-4-1-1024x544.jpg' },
    { name: 'Bebidas', image: 'https://blog.webbar.com.br/wp-content/uploads/2023/07/159304.png' }
  ];

  specificCategories = [
    { name: 'Lanches', image: 'https://via.placeholder.com/150' },
    { name: 'Promoções', image: 'https://via.placeholder.com/150' },
    { name: 'Pizza', image: 'https://via.placeholder.com/150' },
    { name: 'Açaí', image: 'https://via.placeholder.com/150' },
    { name: 'Bebidas', image: 'https://via.placeholder.com/150' },
    { name: 'Brasileira', image: 'https://via.placeholder.com/150' },
    { name: 'Japonesa', image: 'https://via.placeholder.com/150' },
    { name: 'Pastel', image: 'https://via.placeholder.com/150' }
  ];
}
