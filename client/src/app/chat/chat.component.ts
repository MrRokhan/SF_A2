import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageUploadService } from '../services/imageUpload.service';
import { io } from 'socket.io-client';  // Import socket.io-client

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  selectedFile: File | null = null;  
  username: string = 'current_user';  
  currentChannel: string = 'General';  // Default channel
  socket: any;

  constructor(private imageUploadService: ImageUploadService) {}

  ngOnInit() {
    // Connect to Socket.io server
    this.socket = io('http://localhost:3000');

    // Join the default channel
    this.socket.emit('joinChannel', { username: this.username, channel: this.currentChannel });

    // Listen for incoming chat messages
    this.socket.on('chatMessage', (data: any) => {
      this.messages.push({ user: data.username, content: data.message });
    });

    // Listen for user join/leave notifications
    this.socket.on('userJoined', (data: any) => {
      this.messages.push({ user: 'System', content: `${data.username} joined the channel.` });
    });

    this.socket.on('userLeft', (data: any) => {
      this.messages.push({ user: 'System', content: `${data.username} left the channel.` });
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      // Emit message to server
      this.socket.emit('chatMessage', {
        username: this.username,
        message: this.newMessage,
        channel: this.currentChannel
      });

      this.newMessage = '';
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  onSendImage() {
    if (this.selectedFile) {
      this.imageUploadService.uploadChatImage(this.selectedFile, this.newMessage, this.username).subscribe(
        (response) => {
          this.socket.emit('chatMessage', {
            username: this.username,
            message: `Sent an image: ${response.filePath}`,
            channel: this.currentChannel
          });
        },
        (error) => {
          console.error('Error uploading chat image:', error);
        }
      );
      this.selectedFile = null;
    }
  }

  leaveChannel() {
    this.socket.emit('leaveChannel', { username: this.username, channel: this.currentChannel });
  }
}
