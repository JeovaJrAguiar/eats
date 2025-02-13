import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, Button],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  title = 'Disney Eats';

  isDropdownOpen = false;

  constructor(private router: Router) {
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onLogin() {
    this.router.navigate(['/login']);
    console.log('login');
  }
}
