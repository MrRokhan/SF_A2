import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // Add CommonModule and FormsModule to imports array
})
export class ChatComponent {
  messages = [
    { user: 'john_doe', content: 'Hello everyone!' },
    { user: 'jane_doe', content: 'Hi John!' }
  ];
  
  newMessage: string = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ user: 'current_user', content: this.newMessage });
      this.newMessage = '';
    }
  }
}
