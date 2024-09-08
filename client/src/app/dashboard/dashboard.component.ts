import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



interface User {
  id: number;
  username: string;
  role: 'Super Admin' | 'Group Admin' | 'User';
  groups: number[];
  channels: number[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule]
})
export class DashboardComponent {
  currentUser: User = {
    id: 1,
    username: 'super',
    role: 'Super Admin',
    groups: [1],
    channels: [1, 2]
  };

  channels = [
    { id: 1, name: 'General Chat', description: 'General discussion channel', users: [1, 2, 3] },
    { id: 2, name: 'Tech Talk', description: 'Channel for tech discussions', users: [1, 3] }
  ];

  groups = [
    { id: 1, name: 'Group 1', description: 'Group 1 description', users: [1, 2, 3] }
  ];

  getUserChannels(userId: number) {
    return this.channels.filter(channel => channel.users.includes(userId));
  }

  getUserGroups(userId: number) {
    return this.groups.filter(group => group.users.includes(userId));
  }
}
