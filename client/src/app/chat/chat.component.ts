import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageUploadService } from '../services/imageUpload.service';
import { io } from 'socket.io-client';
import Peer from 'peerjs';

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
  username: string = 'current_user'; // Replace with dynamic username
  currentChannel: string = 'General';  // Default channel
  socket: any;
  peer: Peer | null = null;
  peerId: string = '';  // This will store this client's Peer ID
  peerIdOfOtherUser: string = ''; // ID of the other user for the video call
  callInProgress: boolean = false; // Flag to track if the call is in progress

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

    // Set up PeerJS
    this.setupPeer();
  }

  setupPeer() {
    this.peer = new Peer();  // Create a new PeerJS object
    this.peer.on('open', (id: string) => {
      this.peerId = id;  // Assign this client's peer ID
      console.log('My peer ID is:', id);
    });

    // Listen for incoming calls
    this.peer.on('call', (call) => {
      const acceptCall = confirm('Do you want to answer this call?');
      if (acceptCall) {
        // Answer the call with your video stream
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
          call.answer(stream);
          this.callInProgress = true;

          // Show the remote stream in the video element
          call.on('stream', (remoteStream) => {
            const videoElement = document.getElementById('remoteVideo') as HTMLVideoElement;
            if (videoElement) {
              videoElement.srcObject = remoteStream;
              videoElement.play();
            }
          });
        });
      }
    });
  }

  startVideoCall() {
    this.peerIdOfOtherUser = prompt('Enter Peer ID of other user to call') || '';
    if (this.peerIdOfOtherUser && this.peer) {
      // Request only video for testing
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        const call = this.peer?.call(this.peerIdOfOtherUser, stream);
  
        call?.on('stream', (remoteStream) => {
          const videoElement = document.getElementById('remoteVideo') as HTMLVideoElement;
          if (videoElement) {
            videoElement.srcObject = remoteStream;
            videoElement.play();
          }
        });
      }).catch((error) => {
        console.error('Error accessing media devices:', error);
        if (error.name === 'NotFoundError') {
          alert('No camera found. Please ensure a camera is connected.');
        }
      });
    }
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
