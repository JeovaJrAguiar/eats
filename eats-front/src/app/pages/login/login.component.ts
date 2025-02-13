import { Component } from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {Message, MessageModule} from 'primeng/message';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services';
import {Panel, PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {Password, PasswordModule} from 'primeng/password';
import {Button, ButtonModule} from 'primeng/button';
import {MessageService} from 'primeng/api';
import {PrimeNG} from 'primeng/config';

@Component({
  standalone: true,
  selector: 'app-login',
  providers: [CommonModule, ReactiveFormsModule, PanelModule, InputTextModule, PasswordModule, ButtonModule, MessageModule, MessageService],
  templateUrl: './login.component.html',
  imports: [
    Panel,
    ReactiveFormsModule,
    Password,
    Button,
    NgIf,
    ButtonModule,
  ],
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loading = false;

  loginForm: FormGroup;

  message: Message[] = [];

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.loginForm.invalid) {
      return;
    }

    this.submitted = true;

    const { email, password } = this.loginForm.value;

    this.authService.loginMock(email, password).subscribe({
      next: this.handleLoginData.bind(this),
      error: this.handleLoginError.bind(this),
    }).add(() => this.loading = false);
  }

  private handleLoginData() {
    this.router.navigate(['/home']);
  }

  private handleLoginError(error: Error) {
    console.log(error);
    //this.message = [{ severity: 'error', detail: error.message }];
  }
}
