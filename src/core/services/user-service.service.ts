import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEntity } from '../entity/user.entity';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  deleteUser(id: number): Observable<UserEntity> {
    return this.http.delete<UserEntity>(`${this.apiConfig.buildApiUrl('/users')}/${id}/delete`)
  }

  getUserConnected(): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${this.apiConfig.buildApiUrl('/users')}/connected`)
  }

  updateUserPoints(userId: number, points: number): Observable<any> {
    return this.http.put(`${this.apiConfig.buildApiUrl('/users')}/edit/${userId}`, { points });
  }

  getUserBadges(userId: number): Observable<any> {
    return this.http.get(`${this.apiConfig.buildApiUrl('/user-challenges')}/user/${userId}`);
  }
}

