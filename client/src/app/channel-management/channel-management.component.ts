import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule

interface Channel {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-channel-management',
  templateUrl: './channel-management.component.html',
  styleUrls: ['./channel-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // Add CommonModule and FormsModule
})
export class ChannelManagementComponent {
  channels: Channel[] = [
    { id: 1, name: 'General Chat', description: 'General discussion channel' },
    { id: 2, name: 'Tech Talk', description: 'Channel for tech discussions' }
  ];

  newChannel: Partial<Channel> = {}; // For adding/editing channels

  addChannel() {
    if (this.newChannel.name && this.newChannel.description) {
      const newId = this.channels.length ? this.channels[this.channels.length - 1].id + 1 : 1;
      this.channels.push({
        id: newId,
        name: this.newChannel.name,
        description: this.newChannel.description
      } as Channel); // Ensure the new channel conforms to the Channel type
      this.newChannel = {}; // Reset form
    }
  }

  editChannel(channel: Channel) {
    this.newChannel = { ...channel }; // Set form for editing
  }

  deleteChannel(channelId: number) {
    this.channels = this.channels.filter(c => c.id !== channelId);
  }
}
