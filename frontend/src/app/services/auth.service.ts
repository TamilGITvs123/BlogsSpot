import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'bs_token';
  constructor(private http: HttpClient) {}

  register(username: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/register`, { username, password });
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/auth/login`, { username, password });
  }

  saveToken(token: string) { localStorage.setItem(this.tokenKey, token); }
  getToken(): string | null { return localStorage.getItem(this.tokenKey); }
  isAuthenticated() { return !!this.getToken(); }
  logout() { localStorage.removeItem(this.tokenKey); }

  authHeaders() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}
