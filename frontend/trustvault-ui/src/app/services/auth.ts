
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthResponse {
  tokenType?: string;
  accessToken?: string;
  expiresIn?: number;
  refreshToken?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5028';

  constructor(private http: HttpClient) {}

  register(email: string, password: string): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/register`, {
      email,
      password
    });
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/login?useCookies=false`,
        { email, password }
      )
      .pipe(
        tap(response => {
          if (response.accessToken) {
            sessionStorage.setItem(
              'trustvault_access_token',
              response.accessToken
            );
          }
        })
      );
  }

  logout(): void {
    sessionStorage.removeItem('trustvault_access_token');
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem('trustvault_access_token');
  }
}
