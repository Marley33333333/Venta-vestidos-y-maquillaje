import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/v1/auth';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) { 
    const token = localStorage.getItem('token');
    if (token) {
      this.fetchUser(token);
    }
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        this.userSubject.next(response.user);
      })
    );
  }

  register(user: { username: string; email: string; password: string; first_name?: string; last_name?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap(() => this.userSubject.next(null))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): 'admin' | 'customer' | null {
    return this.userSubject.value?.role || null;
  }

  private fetchUser(token: string): void {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      this.userSubject.next({ id: decoded.id, username: decoded.sub, email: decoded.sub, role: decoded.role });
    } catch (e) {
      this.logout();
    }
  }

}
