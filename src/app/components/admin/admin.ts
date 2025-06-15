import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  standalone: true,
  template: `
    <div class="container py-5">
      <h2 class="mb-4">Admin Dashboard</h2>
      <h5>Users</h5>
      @if (users.length) {
        <ul class="list-group">
          @for (user of users; track user.id) {
            <li class="list-group-item">{{ user.username }} ({{ user.email }}) - Role: {{ user.role }}</li>
          }
        </ul>
      } @else {
        <p>No users found.</p>
      }
    </div>
  `
})
export class Admin {
  users: any[] = [];

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get('http://localhost:8080/api/v1/auth/admin/users', { headers }).subscribe({
      next: (data: any) => this.users = data,
      error: () => console.error('Failed to fetch users')
    });
  }

}
