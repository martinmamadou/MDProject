import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ChallengeEntity } from '../entity/challenge.entity';
import { map } from 'rxjs/operators';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  getChallenges(): Observable<ChallengeEntity[]> {
    return this.http.get<ChallengeEntity[]>(`${this.apiConfig.buildApiUrl('/challenges')}`);
  }

  getChallengeById(id: number): Observable<ChallengeEntity> {
    return this.http.get<ChallengeEntity>(`${this.apiConfig.buildApiUrl('/challenges')}/${id}`);
  }

  createChallenge(challenge: ChallengeEntity): Observable<ChallengeEntity> {
    return this.http.post<ChallengeEntity>(`${this.apiConfig.buildApiUrl('/challenges')}/create/admin`, challenge);
  }

  updateChallenge(challenge: ChallengeEntity): Observable<ChallengeEntity> {
    return this.http.put<ChallengeEntity>(`${this.apiConfig.buildApiUrl('/challenges')}/edit/admin/${challenge.id}`, challenge);
  }

  deleteChallenge(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiConfig.buildApiUrl('/challenges')}/remove/admin/${id}`);
  }

  uploadImage(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiConfig.buildApiUrl('/challenges')}/${id}/upload-badge`, formData);
  }

  getChallengeByTarget(target: string): Observable<ChallengeEntity[]> {
    return this.http.get<ChallengeEntity[]>(`${this.apiConfig.buildApiUrl('/challenges')}/target/${target}`);
  }

  getUserChallenges(userId: number): Observable<ChallengeEntity[]> {
    return this.http.get<ChallengeEntity[]>(`${this.apiConfig.buildApiUrl('/user-challenges')}/${userId}`);
  }

  acceptChallenge(userId: number, challengeId: number): Observable<any> {
    return this.http.post(`${this.apiConfig.buildApiUrl('/user-challenges')}/accept`, { challengeId, userId });
  }

  completeChallenge(userId: number, challengeId: number): Observable<any> {
    return this.http.post(`${this.apiConfig.buildApiUrl('/user-challenges')}/complete`, { userId, challengeId });
  }

  getChallengeByCategory(categoryId: number): Observable<ChallengeEntity[]> {
    return this.http.get<ChallengeEntity[]>(`${this.apiConfig.buildApiUrl('/challenges')}/category/${categoryId}`);
  }

  displayChallenge(challengeId: number): Observable<ChallengeEntity[]> {
    return this.http.get<ChallengeEntity[]>(`${this.apiConfig.buildApiUrl('/user-challenges')}/challenge/${challengeId}`);
  }

  getUserChallengeByUserAndChallenge(userId: number, challengeId: number): Observable<any> {
    return this.http.get(`${this.apiConfig.buildApiUrl('/user-challenges')}/user/${userId}/challenge/${challengeId}`);
  }

  completeUserChallenge(id: number, points: number): Observable<any> {
    return this.http.put(`${this.apiConfig.buildApiUrl('/user-challenges')}/user/edit/${id}`, {
      is_completed: true,
      points_earned: points
    });
  }

  loadRandomChallenge(): Observable<ChallengeEntity> {
    return this.getChallenges().pipe(
      map(challenges => {
        const randomIndex = Math.floor(Math.random() * challenges.length);
        return challenges[randomIndex];
      })
    );
  }
}
