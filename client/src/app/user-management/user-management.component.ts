import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UserManagementComponent {
  // Define the users array with some initial mock users
  users = [
    { id: 1, username: 'super', email: 'super@example.com', roles: ['Super Admin'] },
    { id: 2, username: 'admin1', email: 'admin1@example.com', roles: ['Group Admin'] },
    { id: 3, username: 'user1', email: 'user1@example.com', roles: ['User'] }
  ];

  // Fields for the new user form
  newUsername = '';
  newEmail = '';
  errorMessage = '';

  // Create a new user
  createUser() {
    // Check if the username already exists
    const userExists = this.users.some(user => user.username === this.newUsername);

    if (userExists) {
      this.errorMessage = 'Username already exists. Please choose another one.';
      return;
    }

    // Create a new user object and add it to the list
    const newUser = {
      id: this.users.length + 1,
      username: this.newUsername,
      email: this.newEmail,
      roles: ['User']  // Default role is 'User'
    };

    this.users.push(newUser);

    // Clear form fields and error message
    this.newUsername = '';
    this.newEmail = '';
    this.errorMessage = '';
  }

  // Delete a user by their ID
  deleteUser(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
  }
}
