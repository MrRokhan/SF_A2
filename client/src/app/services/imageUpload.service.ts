// imageUpload.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private uploadProfileUrl = 'http://localhost:3000/upload/profile';
  private uploadChatImageUrl = 'http://localhost:3000/upload/chat';

  constructor(private http: HttpClient) { }

  uploadProfileImage(file: File, username: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('avatar', file);
    formData.append('username', username);

    return this.http.post<any>(this.uploadProfileUrl, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }

  uploadChatImage(file: File, message: string, username: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('chatImage', file);
    formData.append('message', message);
    formData.append('username', username);

    return this.http.post<any>(this.uploadChatImageUrl, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }
}
