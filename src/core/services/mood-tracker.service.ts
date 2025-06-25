import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class MoodTrackerService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
    private authService: AuthServiceService
  ) { }

  getMoodTracker(): Observable<any> {
    return this.http.get<any>(`${this.apiConfig.buildApiUrl('/mood-tracker')}`);
  }

  createMoodTracker(moodTracker: any): Observable<any> {
    return this.authService.getCurrentUser().pipe(
      switchMap(user => {
        const moodTrackerWithUserId = {
          ...moodTracker,
          userId: user.id
        };
        return this.http.post<any>(`${this.apiConfig.buildApiUrl('/mood-tracker/create')}`, moodTrackerWithUserId);
      })
    );
  }
}
