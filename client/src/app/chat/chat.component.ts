import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageUploadService } from '../services/imageUpload.service';
import { io, Socket } from 'socket.io-client';  // Import Socket.io client

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ChatComponent implements OnInit, OnDestroy {
  messages = [
    { user: 'john_doe', content: 'Hello everyone!' },
    { user: 'jane_doe', content: 'Hi John!' }
  ];

  newMessage: string = '';
  selectedFile: File | null = null;
  username: string = 'current_user';  // Replace with dynamic username

  private socket: Socket | null = null;

  constructor(private imageUploadService: ImageUploadService) {}

  ngOnInit() {
    // Connect to the Socket.io server
    this.socket = io('http://localhost:3000');

    // Listen for chat messages from the server
    this.socket.on('chatMessage', (message) => {
      this.messages.push(message);  // Update the chat with the new message
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const message = { user: this.username, content: this.newMessage };
      
      // Send the message to the Socket.io server
      this.socket?.emit('chatMessage', message);

      // Clear the input
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
          console.log('Chat image uploaded successfully:', response.filePath);
          const message = { user: this.username, content: `Sent an image: ${response.filePath}` };

          // Send the image message to the Socket.io server
          this.socket?.emit('chatMessage', message);
        },
        (error) => {
          console.error('Error uploading chat image:', error);
        }
      );
      this.selectedFile = null;
    }
  }

  ngOnDestroy() {
    // Disconnect the socket when the component is destroyed
    this.socket?.disconnect();
  }
}
