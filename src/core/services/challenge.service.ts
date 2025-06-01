import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ChallengeEntity } from '../entity/challenge.entity';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private apiUrl = 'http://localhost:3000/challenges';
  private userChallengeApi = 'http://localhost:3000/user-challenges';
  constructor(private http: HttpClient) { }

  getChallenges(): Observable<ChallengeEntity[]> {
    return this.http.get<ChallengeEntity[]>(this.apiUrl);
  }

  createChallenge(challenge: ChallengeEntity): Observable<ChallengeEntity> {
    return this.http.post<ChallengeEntity>(`${this.apiUrl}/create/admin`, challenge);
  }

  updateChallenge(challenge: ChallengeEntity): Observable<ChallengeEntity> {
    return this.http.put<ChallengeEntity>(`${this.apiUrl}/edit/admin/${challenge.id}`, challenge);
  }

  getChallengeById(id: number): Observable<ChallengeEntity> {
    return this.http.get<ChallengeEntity>(`${this.apiUrl}/${id}`);
  }

  getChallengeByTarget(target: string): Observable<ChallengeEntity[]> {
    return this.http.get<ChallengeEntity[]>(`${this.apiUrl}/target/${target}`);
  }

  acceptChallenge(challengeId: number, userId: number): Observable<any> {
    return this.http.post(`${this.userChallengeApi}`, { id_user: userId, id_challenge: challengeId });
  }


  getChallengeByCategory(categoryId: number): Observable<ChallengeEntity[]> {
    return this.http.get<ChallengeEntity[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  displayChallenge(challengeId: number): Observable<ChallengeEntity[]> {
    return this.http.get<ChallengeEntity[]>(`${this.userChallengeApi}/challenge/${challengeId}`);
  }

  getUserChallengeByUserAndChallenge(userId: number, challengeId: number): Observable<any> {
    return this.http.get(`${this.userChallengeApi}/user/${userId}/challenge/${challengeId}`);
  }

  completeUserChallenge(id: number, points: number): Observable<any> {
    return this.http.put(`${this.userChallengeApi}/user/edit/${id}`, {
      is_completed: true,
      points_earned: points
    });
  }
}
