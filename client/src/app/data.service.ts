// import { Injectable } from '@angular/core';

// interface User {
//   id: number;
//   username: string;
//   role: 'Super Admin' | 'Group Admin' | 'User';
//   groups: number[];
//   channels: number[];
// }

// interface Group {
//   id: number;
//   name: string;
//   description: string;
//   channels: string[];
//   users: string[];
// }

// interface Channel {
//   id: number;
//   name: string;
//   description: string;
//   users: number[];
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {
//   private groups: Group[] = [
//     { id: 1, name: 'Group 1', description: 'Description 1', channels: ['General'], users: ['admin1', 'user1'] },
//     { id: 2, name: 'Group 2', description: 'Description 2', channels: ['General'], users: ['admin1'] }
//   ];

//   private channels: Channel[] = [
//     { id: 1, name: 'General Chat', description: 'General discussion channel', users: [1, 2, 3] },
//     { id: 2, name: 'Tech Talk', description: 'Channel for tech discussions', users: [1, 3] }
//   ];

//   private users: User[] = [
//     { id: 1, username: 'super', role: 'Super Admin', groups: [1], channels: [1, 2] },
//     { id: 2, username: 'admin1', role: 'Group Admin', groups: [1], channels: [1] },
//     { id: 3, username: 'user1', role: 'User', groups: [1], channels: [1, 2] }
//   ];

//   getGroups() {
//     return this.groups;
//   }

//   getChannels() {
//     return this.channels;
//   }

//   getUsers() {
//     return this.users;
//   }

//   addGroup(group: Group) {
//     group.id = this.groups.length + 1;
//     this.groups.push(group);
//   }

//   deleteGroup(groupId: number) {
//     this.groups = this.groups.filter(group => group.id !== groupId);
//   }

//   addChannel(channel: Channel) {
//     channel.id = this.channels.length + 1;
//     this.channels.push(channel);
//   }

//   deleteChannel(channelId: number) {
//     this.channels = this.channels.filter(channel => channel.id !== channelId);
//   }

//   updateUsersInGroup(groupId: number, userIds: string[]) {
//     const group = this.groups.find(g => g.id === groupId);
//     if (group) {
//       group.users = userIds;
//     }
//   }

//   updateUsersInChannel(channelId: number, userIds: number[]) {
//     const channel = this.channels.find(c => c.id === channelId);
//     if (channel) {
//       channel.users = userIds;
//     }
//   }
// }

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Function to save data to local storage (simulating saving to JSON)
  saveData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Function to load data from local storage
  loadData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // Function to simulate deleting data
  deleteData(key: string): void {
    localStorage.removeItem(key);
  }
}
