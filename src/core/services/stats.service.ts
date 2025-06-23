import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatsEntity } from '../entity/stats.entity';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  getStats(): Observable<StatsEntity[]> {
    return this.http.get<StatsEntity[]>(`${this.apiConfig.buildApiUrl('/stats')}`);
  }

  getAllStats(): Observable<StatsEntity[]> {
    return this.http.get<StatsEntity[]>(`${this.apiConfig.buildApiUrl('/stats')}/all`);
  }

  getStatsByUserId(userId: number): Observable<StatsEntity> {
    return this.http.get<StatsEntity>(`${this.apiConfig.buildApiUrl('/stats')}/${userId}`);
  }
}
