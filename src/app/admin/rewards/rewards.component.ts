import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RewardsService } from '../../../core/services/rewards.service';
import { RewardEntity } from '../../../core/entity/reward.entity';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-rewards',
  standalone: true,
  imports: [RouterModule, NgFor],
  templateUrl: './rewards.component.html',
  styleUrl: './rewards.component.scss'
})
export class RewardsComponent {
  rewards: RewardEntity[] = [];

  constructor(private rewardsService: RewardsService) {
    this.rewardsService.getRewards().subscribe(rewards => this.rewards = rewards);
  }

  deleteReward(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette récompense ?')) {
      this.rewardsService.deleteReward(id).subscribe({
        next: () => {
          this.rewards = this.rewards.filter(reward => reward.id !== id);
        },
        error: (error) => console.error('Erreur lors de la suppression:', error)
      });
    }
  }
}
