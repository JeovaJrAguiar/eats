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
    { name: 'Lanches', image: 'https://cdn-icons-png.flaticon.com/512/1409/1409167.png' },
    { name: 'Promoções', image: 'https://cdn-icons-png.flaticon.com/512/6632/6632895.png' },
    { name: 'Pizza', image: 'https://cdn-icons-png.flaticon.com/512/5787/5787031.png' },
    { name: 'Açaí', image: 'https://cdn-icons-png.flaticon.com/512/5848/5848248.png' },
    { name: 'Bebidas', image: 'https://cdn-icons-png.flaticon.com/512/3239/3239567.png' },
    { name: 'Brasileira', image: 'https://cdn-icons-png.flaticon.com/512/11807/11807797.png' },
    { name: 'Japonesa', image: 'https://cdn-icons-png.flaticon.com/512/641/641867.png' },
    { name: 'Pastel', image: 'https://cdn-icons-png.flaticon.com/512/5854/5854311.png' }
  ];
}
