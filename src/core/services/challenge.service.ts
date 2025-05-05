import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ChallengeEntity } from '../entity/challenge.entity';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private apiUrl = 'http://localhost:3000/challenges';

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
}
