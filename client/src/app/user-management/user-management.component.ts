import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  standalone: true,
  imports: [CommonModule]  // Add CommonModule to the imports array
})
export class UserManagementComponent {
  users = [
    { id: 1, username: 'john_doe', email: 'john@example.com', role: 'user' },
    { id: 2, username: 'jane_doe', email: 'jane@example.com', role: 'admin' }
  ];

  addUser() {
    // Implement add user functionality
  }

  editUser(user: any) {
    // Implement edit user functionality
  }

  deleteUser(userId: number) {
    // Implement delete user functionality
  }
}
