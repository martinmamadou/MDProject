import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RewardEntity } from '../entity/reward.entity';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  private apiUrl = 'http://localhost:3000/rewards';

  constructor(private http: HttpClient) { }

  getRewards(): Observable<RewardEntity[]> {
    return this.http.get<RewardEntity[]>(`${this.apiUrl}`);
  }

  getRewardById(id: number): Observable<RewardEntity> {
    return this.http.get<RewardEntity>(`${this.apiUrl}/${id}`);
  }

  createReward(reward: RewardEntity): Observable<RewardEntity> {
    return this.http.post<RewardEntity>(`${this.apiUrl}/create`, reward);
  }

  updateReward(reward: RewardEntity): Observable<RewardEntity> {
    return this.http.put<RewardEntity>(`${this.apiUrl}/edit/${reward.id}`, reward);
  }

  deleteReward(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove/${id}`);
  }
}
