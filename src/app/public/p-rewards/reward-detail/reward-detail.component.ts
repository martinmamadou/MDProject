import { Component, OnInit } from '@angular/core';
import { RewardEntity } from '../../../../core/entity/reward.entity';
import { ActivatedRoute } from '@angular/router';
import { RewardsService } from '../../../../core/services/rewards.service';
import { CommonModule } from '@angular/common';
import { UserEntity } from '../../../../core/entity/user.entity';
import { UserServiceService } from '../../../../core/services/user-service.service';

@Component({
  selector: 'app-reward-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reward-detail.component.html',
  styleUrl: './reward-detail.component.scss'
})
export class RewardDetailComponent implements OnInit {
  reward!: RewardEntity;
  user!: UserEntity;
  private baseUrl = 'http://localhost:3000/uploads/';
  progressPercentage: number = 0;

  constructor(private rewardsService: RewardsService, private route: ActivatedRoute, private userService: UserServiceService) {
  }

  ngOnInit(): void {
    this.userService.getUserConnected().subscribe(user => {
      this.user = user;
      if (this.reward) {
        this.calculateProgress();
      }
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.rewardsService.getRewardById(+id).subscribe(reward => {
        this.reward = {
          ...reward,
          image_url: reward.image_url ? `${this.baseUrl}${reward.image_url}` : ''
        };
        if (this.user) {
          this.calculateProgress();
        }
      });
    }
  }

  private calculateProgress() {
    this.progressPercentage = Math.min((this.user.points / this.reward.points_needed) * 100, 100);
  }

  claimReward() {
    if (this.user.points >= this.reward.points_needed) {
      this.rewardsService.claimReward(this.user.id, this.reward.id).subscribe(response => {
        const newPoints = this.user.points - this.reward.points_needed;
        this.userService.updateUserPoints(this.user.id, newPoints).subscribe(() => {
          this.user.points = newPoints;
          console.log('Récompense débloquée et points mis à jour');
        });
      });
    } else {
      console.log('Vous n\'avez pas assez de points');
    }
  }
}