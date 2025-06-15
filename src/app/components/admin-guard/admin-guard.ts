import { Component } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-admin-guard',
  imports: [],
  templateUrl: './admin-guard.html',
  styleUrl: './admin-guard.scss'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn() && this.authService.getRole() === 'admin') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
