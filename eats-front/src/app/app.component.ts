import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {FooterComponent, HeaderComponent} from './shared/components';
import {CommandModule} from '@angular/cli/src/command-builder/command-module';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {PrimeNGConfigType} from 'primeng/config';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CommonModule, FooterComponent, Toast, ConfirmDialog],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Eats';

  showHeader: boolean = false;

  loggedIn: boolean = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    //this.showHeader = isPlatformBrowser(this.platformId) && (window.location.pathname === '/login' || window.location.pathname === '/registro');

    this.updateShowHeader();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateShowHeader();
      }
    });

  }

  updateShowHeader() {
    this.showHeader = this.router.url === '/login' || this.router.url === '/registro';
  }
}
