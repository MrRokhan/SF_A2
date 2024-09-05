import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = 'http://localhost:3000/api/groups'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getGroups(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createGroup(group: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, group);
  }

  deleteGroup(groupId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${groupId}`);
  }
}
