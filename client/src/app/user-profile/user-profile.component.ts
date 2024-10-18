import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule for NgIf
import { ImageUploadService } from '../services/imageUpload.service';  
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';  

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [RouterOutlet, CommonModule]  // Add CommonModule here
})
export class UserProfileComponent {
  selectedFile: File | null = null;  
  username: string = 'testUser';  
  profileImageUrl: SafeUrl | null = null;  

  constructor(private imageUploadService: ImageUploadService, private sanitizer: DomSanitizer) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  onUpload() {
    if (this.selectedFile) {
      this.imageUploadService.uploadProfileImage(this.selectedFile, this.username).subscribe(
        (response) => {
          console.log('Profile image uploaded successfully:', response.filePath);
          this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(response.filePath);  
          alert('Profile image uploaded successfully!');
        },
        (error) => {
          console.error('Error uploading profile image:', error);
        }
      );
    } else {
      alert('Please select an image!');
    }
  }
}
