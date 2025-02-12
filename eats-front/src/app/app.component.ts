import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {FooterComponent, HeaderComponent} from './shared/components';
import {CommandModule} from '@angular/cli/src/command-builder/command-module';
import {CommonModule} from '@angular/common';
import {PrimeNGConfigType} from 'primeng/config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CommonModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Eats';

  showHeader = true;

  constructor(
    private router: Router
  ) {
  }
}
