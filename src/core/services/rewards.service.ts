import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RewardEntity } from '../entity/reward.entity';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  getRewards(): Observable<RewardEntity[]> {
    return this.http.get<RewardEntity[]>(`${this.apiConfig.buildApiUrl('/rewards')}`);
  }

  getRewardById(id: number): Observable<RewardEntity> {
    return this.http.get<RewardEntity>(`${this.apiConfig.buildApiUrl('/rewards')}/${id}`);
  }

  createReward(reward: RewardEntity): Observable<RewardEntity> {
    return this.http.post<RewardEntity>(`${this.apiConfig.buildApiUrl('/rewards')}/create`, reward);
  }

  updateReward(reward: RewardEntity): Observable<RewardEntity> {
    return this.http.put<RewardEntity>(`${this.apiConfig.buildApiUrl('/rewards')}/edit/${reward.id}`, reward);
  }

  deleteReward(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiConfig.buildApiUrl('/rewards')}/remove/${id}`);
  }

  getRewardsCategory(): Observable<RewardEntity[]> {
    return this.http.get<RewardEntity[]>(`${this.apiConfig.buildApiUrl('/rewards-category')}`);
  }

  getRewardsByCategory(categoryId: number): Observable<RewardEntity[]> {
    return this.http.get<RewardEntity[]>(`${this.apiConfig.buildApiUrl('/rewards')}/category/${categoryId}`);
  }

  exchangeReward(userId: number, rewardId: number): Observable<any> {
    return this.http.post(`${this.apiConfig.buildApiUrl('/user-reward')}/exchange`, { userId, rewardId });
  }

  getUserRewards(userId: number): Observable<RewardEntity[]> {
    return this.http.get<RewardEntity[]>(`${this.apiConfig.buildApiUrl('/user-reward')}/${userId}`);
  }

  claimReward(userId: number, rewardId: number): Observable<RewardEntity> {
    return this.http.post<RewardEntity>(`${this.apiConfig.buildApiUrl('/user-reward')}/create`, {
      id_user: userId,
      id_reward: rewardId
    });
  }

  uploadImage(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiConfig.buildApiUrl('/rewards')}/${id}/upload`, formData);
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
