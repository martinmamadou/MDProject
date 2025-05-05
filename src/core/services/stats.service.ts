import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatsEntity } from '../entity/stats.entity';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = 'http://localhost:3000/stats';

  constructor(private http: HttpClient) { }

  getStats(): Observable<StatsEntity[]> {
    return this.http.get<StatsEntity[]>(`${this.apiUrl}`);
  }

  getAllStats(): Observable<StatsEntity[]> {
    return this.http.get<StatsEntity[]>(`${this.apiUrl}/all`);
  }

  getStatsByUserId(userId: number): Observable<StatsEntity> {
    return this.http.get<StatsEntity>(`${this.apiUrl}/${userId}`);
  }
}
