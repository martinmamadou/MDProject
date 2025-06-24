import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoodTrackerService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  getMoodTracker(): Observable<any> {
    return this.http.get<any>(`${this.apiConfig.buildApiUrl('/mood-tracker')}`);
  }
}
