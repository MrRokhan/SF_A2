import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';  // Import the data service

interface User {
  id: number;
  username: string;
  email: string;
  role: 'Super Admin' | 'Group Admin' | 'User';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromLocalStorage());
  public currentUser = this.currentUserSubject.asObservable();

  private mockUsers: User[] = [
    { id: 1, username: 'super', email: 'super@example.com', role: 'Super Admin' },
    { id: 2, username: 'admin1', email: 'admin1@example.com', role: 'Group Admin' },
    { id: 3, username: 'user1', email: 'user1@example.com', role: 'User' }
  ];

  constructor(private dataService: DataService) { }  // Inject the data service

  // Simulate user login
  login(username: string, password: string): boolean {
    const user = this.mockUsers.find(u => u.username === username);

    if (user) {
      this.currentUserSubject.next(user);
      this.dataService.saveData('currentUser', user);  // Save to "data" file (local storage)
      return true;
    }
    return false;
  }

  // Logout user
  logout(): void {
    this.currentUserSubject.next(null);
    this.dataService.deleteData('currentUser');  // Remove user from storage
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  // Get current user's role
  getCurrentUserRole(): string | null {
    return this.currentUserSubject.value?.role || null;
  }

  // Utility method to check user role
  hasRole(role: string): boolean {
    return this.currentUserSubject.value?.role === role;
  }

  private getUserFromLocalStorage(): User | null {
    return this.dataService.loadData('currentUser');  // Load user from local storage
  }
}
