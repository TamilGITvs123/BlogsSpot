import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class BlogService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  list() { return this.http.get<any[]>(`${environment.apiUrl}/blogs`); }
  get(id: number) { return this.http.get(`${environment.apiUrl}/blogs/${id}`); }

  create(title: string, content: string) {
    return this.http.post(`${environment.apiUrl}/blogs`, { title, content }, { headers: new HttpHeaders(this.auth.authHeaders()) });
  }

  update(id: number, title: string, content: string) {
    return this.http.put(`${environment.apiUrl}/blogs/${id}`, { title, content }, { headers: new HttpHeaders(this.auth.authHeaders()) });
  }
}
