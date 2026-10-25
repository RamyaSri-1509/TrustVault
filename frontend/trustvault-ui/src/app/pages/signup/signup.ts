
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {
  email = '';
  password = '';
  confirmPassword = '';

  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSignup(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email.trim() || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'Password must contain at least 8 characters.';
      return;
    }

    this.loading = true;

    this.authService.register(
      this.email.trim(),
      this.password
    ).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Account created successfully! Redirecting to login...';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1200);
      },
      error: (error) => {
        this.loading = false;

        const errors = error?.error?.errors;

        if (errors) {
          this.errorMessage = Object.values(errors)
            .flat()
            .join(' ');
        } else if (error?.status === 0) {
          this.errorMessage =
            'Cannot connect to the server. Check whether the backend is running.';
        } else {
          this.errorMessage =
            error?.error?.detail ||
            error?.error?.title ||
            'Registration failed. Please try again.';
        }
      }
    });
  }
}
