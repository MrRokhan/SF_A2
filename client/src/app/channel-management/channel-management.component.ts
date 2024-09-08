import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Channel {
  id: number;
  name: string;
  description: string;
  users: number[]; // List of user IDs who are part of this channel
}

interface User {
  id: number;
  username: string;
  role: 'Super Admin' | 'Group Admin' | 'User';
  groups: number[];
  channels: number[]; // List of channel IDs this user is part of
}

@Component({
  selector: 'app-channel-management',
  templateUrl: './channel-management.component.html',
  styleUrls: ['./channel-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ChannelManagementComponent implements OnInit {
  channels: Channel[] = [];
  users: User[] = [];
  newChannel: Partial<Channel> = {}; // For adding/editing channels
  currentUser: User = {
    id: 1,
    username: 'super',
    role: 'Super Admin',  // Change this to test with different roles
    groups: [1],
    channels: [1, 2]
  };

  // For role-based view and actions
  canEditChannels = false;
  canManageUsersInChannels = false;

  ngOnInit() {
    this.loadChannelsFromLocalStorage();
    this.loadUsersFromLocalStorage();
    this.updatePermissions();
  }

  // Set permissions based on the current user's role
  updatePermissions() {
    if (this.currentUser.role === 'Super Admin') {
      this.canEditChannels = true;
      this.canManageUsersInChannels = true;
    } else if (this.currentUser.role === 'Group Admin') {
      this.canEditChannels = true;
      this.canManageUsersInChannels = true;
    } else {
      this.canEditChannels = false;
      this.canManageUsersInChannels = false;
    }
  }

  // Load channels from localStorage
  loadChannelsFromLocalStorage() {
    const storedChannels = localStorage.getItem('channels');
    if (storedChannels) {
      this.channels = JSON.parse(storedChannels);
    } else {
      this.channels = [
        { id: 1, name: 'General Chat', description: 'General discussion channel', users: [1, 2, 3] },
        { id: 2, name: 'Tech Talk', description: 'Channel for tech discussions', users: [1, 3] }
      ];
    }
  }

  // Load users from localStorage
  loadUsersFromLocalStorage() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.users = [
        { id: 1, username: 'super', role: 'Super Admin', groups: [1], channels: [1, 2] },
        { id: 2, username: 'admin1', role: 'Group Admin', groups: [1], channels: [1] },
        { id: 3, username: 'user1', role: 'User', groups: [1], channels: [1, 2] }
      ];
    }
  }

  // Save channels to localStorage
  saveChannelsToLocalStorage() {
    localStorage.setItem('channels', JSON.stringify(this.channels));
  }

  // Save users to localStorage
  saveUsersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  addChannel() {
    if (this.newChannel.name && this.newChannel.description) {
      const newId = this.channels.length ? this.channels[this.channels.length - 1].id + 1 : 1;
      this.channels.push({
        id: newId,
        name: this.newChannel.name,
        description: this.newChannel.description,
        users: [] // Initialize with no users
      } as Channel);
      this.newChannel = {}; // Reset form
      this.saveChannelsToLocalStorage(); // Persist the new channel
    }
  }

  editChannel(channel: Channel) {
    if (this.canEditChannels) {
      this.newChannel = { ...channel }; // Set form for editing
    } else {
      alert('You do not have permission to edit channels.');
    }
  }

  deleteChannel(channelId: number) {
    if (this.canEditChannels) {
      this.channels = this.channels.filter(c => c.id !== channelId);
      this.saveChannelsToLocalStorage(); // Persist the deletion
    } else {
      alert('You do not have permission to delete channels.');
    }
  }

  addUserToChannel(channelId: number, userId: number) {
    if (this.canManageUsersInChannels) {
      const channel = this.channels.find(c => c.id === channelId);
      const user = this.users.find(u => u.id === userId);

      if (channel && user && !channel.users.includes(userId)) {
        channel.users.push(userId);
        user.channels.push(channelId);
        this.saveChannelsToLocalStorage();
        this.saveUsersToLocalStorage(); // Persist user addition
      }
    } else {
      alert('You do not have permission to add users to channels.');
    }
  }

  removeUserFromChannel(channelId: number, userId: number) {
    if (this.canManageUsersInChannels) {
      const channel = this.channels.find(c => c.id === channelId);
      const user = this.users.find(u => u.id === userId);

      if (channel && user) {
        channel.users = channel.users.filter(id => id !== userId);
        user.channels = user.channels.filter(id => id !== channelId);
        this.saveChannelsToLocalStorage();
        this.saveUsersToLocalStorage(); // Persist user removal
      }
    } else {
      alert('You do not have permission to remove users from channels.');
    }
  }

  getUserById(userId: number): User | undefined {
    return this.users.find(user => user.id === userId);
  }

  getChannelUsers(channel: Channel): string {
    return channel.users
      .map(userId => this.getUserById(userId)?.username || 'Unknown')
      .join(', ');
  }
}
