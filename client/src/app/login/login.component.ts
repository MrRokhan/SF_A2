// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   standalone: true,
//   imports: [FormsModule, RouterOutlet]
// })
// export class LoginComponent {
//   username: string = '';
//   password: string = '';

//   constructor(private router: Router) {}

//   login() {
//     if (this.username === 'admin' && this.password === 'admin') {
//       this.router.navigate(['/dashboard']);
//     } else {
//       alert('Invalid credentials');
//     }
//   }
// }

import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface User {
  username: string;
  password: string;
  roles: string[];
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, RouterOutlet]
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  // Mock user data
  private mockUsers: User[] = [
    { username: 'super', password: '123', roles: ['Super Admin'] },
    { username: 'admin1', password: 'admin123', roles: ['Group Admin'] },
    { username: 'user1', password: 'user123', roles: ['User'] },
  ];

  private currentUser: User | null = null;

  constructor(private router: Router) {}

  login() {
    const user = this.mockUsers.find(u => u.username === this.username && u.password === this.password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      // Redirect based on user role
      if (user.roles.includes('Super Admin')) {
        this.router.navigate(['/dashboard']);
      } else if (user.roles.includes('Group Admin')) {
        this.router.navigate(['/groups']);
      } else if (user.roles.includes('User')) {
        this.router.navigate(['/chat']);
      } else {
        this.errorMessage = 'Role not recognized';
      }
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
  

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  hasRole(role: string): boolean {
    return this.currentUser?.roles.includes(role) ?? false;
  }
}
