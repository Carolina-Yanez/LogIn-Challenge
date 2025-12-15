import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  name: string;
  email: string;
  role?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/api/auth';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  // Estado de autenticación (true/false)
  private authSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authSubject.asObservable();

  // Datos del usuario actual
  private userSubject = new BehaviorSubject<User | null>(this.getCurrentUser());
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string, isAdminLogin: boolean = false): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, { email, password, isAdminLogin })
      .pipe(
        tap((response) => {
          this.saveAuthData(response.token, response.user);
        })
      );
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, {
      name,
      email,
      password
    }).pipe(
      tap((response) => {
        this.saveAuthData(response.token, response.user);
      })
    );
  }

  logout(): void {
    this.clearAuthData();
  }

  verifyToken(): Observable<any> {
    return this.http.get(`${this.API_URL}/verify`);
  }

  private saveAuthData(token: string, user: User): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));

    this.authSubject.next(true);
    this.userSubject.next(user);
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);

    this.authSubject.next(false);
    this.userSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
