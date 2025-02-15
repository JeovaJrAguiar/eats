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
import {UserService} from '../../shared/services';
import {User} from '../../shared/models';

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

  loginError = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    // if (this.loginForm.invalid) {
    //   return;
    // }

    this.submitted = true;
    this.loading = true;

    const { email, password } = this.loginForm.value;

    this.userService.login(email, password).subscribe(() => {
      this.router.navigate(['/friends']);
    }, () => {
      //
    });
  }

    // this.authService.loginMock(email, password).subscribe({
    //   next: this.handleLoginData.bind(this),
    //   error: this.handleLoginError.bind(this),
    // }).add(() => this.loading = false);

    // this.userService.login(email, password).subscribe({
    //   next: (success) => {
    //     if (success) {
    //       this.router.navigate(['/home']);
    //     } else {
    //       this.loginError = true;
    //       console.error('Falha no login');
    //     }
    //   },
    //   error: (error) => {
    //     console.error(error);
    //     this.loginError = true;
    //   }
    // });


  // private handleLoginData() {
  //   this.router.navigate(['/home']);
  // }

  // private handleLoginError(error: Error) {
  //   console.log(error);
  //   //this.message = [{ severity: 'error', detail: error.message }];
  // }
}
