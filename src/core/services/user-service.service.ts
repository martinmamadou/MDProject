import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEntity } from '../entity/user.entity';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  deleteUser(id: number): Observable<UserEntity> {
    return this.http.delete<UserEntity>(`${this.apiUrl}/${id}/delete`)
  }

  getUserConnected(): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${this.apiUrl}/connected`)
  }

  updateUserPoints(userId: number, points: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit/${userId}`, { points });
  }
}

