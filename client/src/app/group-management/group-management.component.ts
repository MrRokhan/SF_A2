import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css'],
  standalone: true,
  imports: [CommonModule]  // Add CommonModule to the imports array
})
export class GroupManagementComponent {
  groups = [
    { id: 1, name: 'Group 1', description: 'Description 1' },
    { id: 2, name: 'Group 2', description: 'Description 2' }
  ];

  createGroup() {
    // Implement create group functionality
  }

  editGroup(group: any) {
    // Implement edit group functionality
  }

  deleteGroup(groupId: number) {
    // Implement delete group functionality
  }
}
