import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserEntity } from '../entity/user.entity';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  getUsers(): Observable<UserEntity[]> {
    return this.http.get<UserEntity[]>(`${this.apiConfig.buildApiUrl('/users')}`);
  }
}