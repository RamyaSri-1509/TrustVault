
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

interface DemoUser {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email = '';
  password = '';
  hidePassword = true;
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router) {}

  login(): void {
    this.errorMessage = '';
    this.successMessage = '';

    const email = this.email.trim().toLowerCase();

    if (!email || !this.password) {
      this.errorMessage = 'Please enter your email and password.';
      return;
    }

    const users: DemoUser[] = JSON.parse(
      sessionStorage.getItem('trustvault_demo_users') || '[]'
    );

    const user = users.find(
      item => item.email.toLowerCase() === email &&
              item.password === this.password
    );

    if (!user) {
      this.errorMessage =
        'Account not found or password is incorrect. Please sign up or check your credentials.';
      return;
    }

    sessionStorage.setItem(
      'trustvault_demo_user',
      JSON.stringify({ name: user.name, email: user.email })
    );

    this.router.navigate(['/']);
  }
}
