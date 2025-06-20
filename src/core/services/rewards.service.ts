import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RewardEntity } from '../entity/reward.entity';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  private apiUrl = 'http://localhost:3000/rewards';
  private apiUrlCategory = 'http://localhost:3000/rewards-category';
  private apiUrlUserReward = 'http://localhost:3000/user-reward';

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

  getRewardsCategory(): Observable<RewardEntity[]> {
    return this.http.get<RewardEntity[]>(`${this.apiUrlCategory}`);
  }

  getRewardsByCategory(categoryId: number): Observable<RewardEntity[]> {
    return this.http.get<RewardEntity[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  getUserRewards(userId: number): Observable<RewardEntity[]> {
    return this.http.get<RewardEntity[]>(`${this.apiUrlUserReward}/user/${userId}`);
  }

  claimReward(userId: number, rewardId: number): Observable<RewardEntity> {
    return this.http.post<RewardEntity>(`${this.apiUrlUserReward}/create`, {
      id_user: userId,
      id_reward: rewardId
    });
  }

  uploadImage(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/${id}/upload`, formData);
  }

  
  loadRandomReward(): Observable<RewardEntity> {
    return this.getRewards().pipe(
      map((rewards: RewardEntity[]) => {
        const randomIndex = Math.floor(Math.random() * rewards.length);
        return rewards[randomIndex];
      })
    );
  }

  LoadRandomRewardLimit5(): Observable<RewardEntity[]> {
    return this.getRewards().pipe(
      map((rewards: RewardEntity[]) => {
        return rewards.slice(0, 5);
      })
    );
  }
}
