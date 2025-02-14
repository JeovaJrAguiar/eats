import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';
import {User} from '../../models';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  title = 'Disney Eats';

  cartCount: number = 3;

  isDropdownOpen = false;

  isHomePage: boolean;

  dropdownAberto: boolean = true;

  user: User;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isHomePage = isPlatformBrowser(this.platformId) && window.location.pathname === '/';


    this.user = { name: '', email: '' };

    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.user.name = user.name;
      this.user.email = user.email;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onSearch() {
    // TODO: Passar por parametro texto da pesquisa
    this.router.navigate(['/home']);
  }

  logout() {
    this.dropdownAberto = false;
    window.location.href = '/login';
  }


}
