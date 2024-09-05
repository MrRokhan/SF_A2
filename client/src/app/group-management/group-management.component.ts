import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class GroupManagementComponent {
  groups = [
    { id: 1, name: 'Group 1', description: 'Description 1', channels: ['General'], users: ['admin1', 'user1'] },
    { id: 2, name: 'Group 2', description: 'Description 2', channels: ['General'], users: ['admin1'] }
  ];

  newGroupName = '';
  newChannelName = '';
  newUserToAdd = '';

  selectedGroup: any = null;

  // Mock user data for adding to groups
  availableUsers = ['user1', 'user2', 'user3', 'admin1'];

  // Create a new group
  createGroup() {
    if (this.newGroupName) {
      const newGroup = {
        id: this.groups.length + 1,
        name: this.newGroupName,
        description: '',
        channels: ['General'],
        users: []
      };
      this.groups.push(newGroup);
      this.newGroupName = '';
    }
  }

  // Select a group to manage (channels, users)
  selectGroup(group: any) {
    this.selectedGroup = group;
  }

  // Add a channel to the selected group
  addChannel() {
    if (this.newChannelName && this.selectedGroup) {
      this.selectedGroup.channels.push(this.newChannelName);
      this.newChannelName = '';
    }
  }

  // Add a user to the selected group
  addUserToGroup() {
    if (this.newUserToAdd && this.selectedGroup) {
      if (!this.selectedGroup.users.includes(this.newUserToAdd)) {
        this.selectedGroup.users.push(this.newUserToAdd);
      }
      this.newUserToAdd = '';
    }
  }

  // Remove a user from the selected group
  removeUserFromGroup(user: string) {
    if (this.selectedGroup) {
      this.selectedGroup.users = this.selectedGroup.users.filter((u: string) => u !== user);
    }
  }

  // Delete a group
  deleteGroup(groupId: number) {
    this.groups = this.groups.filter(group => group.id !== groupId);
    if (this.selectedGroup && this.selectedGroup.id === groupId) {
      this.selectedGroup = null; // Clear the selected group if it's deleted
    }
  }

  // Remove a channel from the selected group
  removeChannel(channel: string) {
    if (this.selectedGroup) {
      this.selectedGroup.channels = this.selectedGroup.channels.filter((c: string) => c !== channel);
    }
  }
}
