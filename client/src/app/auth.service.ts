// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private users = [
//     { username: 'super', password: '123', role: 'SuperAdmin' },
//     { username: 'admin', password: '123', role: 'GroupAdmin' },
//     { username: 'user', password: '123', role: 'User' },
//   ];

//   private currentUser: { username: string; role: string } | null = null;

//   login(username: string, password: string): boolean {
//     const user = this.users.find(
//       (u) => u.username === username && u.password === password
//     );
//     if (user) {
//       this.currentUser = { username: user.username, role: user.role };
//       return true;
//     }
//     return false;
//   }

//   logout(): void {
//     this.currentUser = null;
//   }

//   getUser(): { username: string; role: string } | null {
//     return this.currentUser;
//   }

//   isAuthenticated(): boolean {
//     return !!this.currentUser;
//   }

//   getRole(): string | null {
//     return this.currentUser?.role || null;
//   }
// }
