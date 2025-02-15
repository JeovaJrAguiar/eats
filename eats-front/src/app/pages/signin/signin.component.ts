import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message} from 'primeng/message';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services';

@Component({
  selector: 'app-signin',
  imports: [],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  loading = false;
  loginError = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  onSubmit(event: Event) {
    event.preventDefault(); // Evita o refresh da página

    this.loading = true;
    this.loginError = false;

    const name = (document.getElementById('username') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    const user = {
      name: name,
      email: email,
      password: password
    };

    this.userService.saveUser(user).subscribe({
      next: (response) => {
        this.loading = false;
        // if (response) {
          this.router.navigate(['/home']);
        // } else {
        //   this.loginError = true;
        // }
      },
      error: (error) => {
        this.loading = false;
        this.loginError = true;
        console.error("Save user error:", error);
      }
    });
  }

}
