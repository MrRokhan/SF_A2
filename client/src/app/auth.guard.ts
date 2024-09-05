import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if `localStorage` is available and if `window` is defined
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (user) {
        return true;
      }
    }
    // If not authenticated, redirect to login
    this.router.navigate(['/login']);
    return false;
  }
}
