import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserEntity } from '../entity/user.entity';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserEntity[]> {

    return this.http.get<UserEntity[]>(`${this.apiUrl}`);
  }
}