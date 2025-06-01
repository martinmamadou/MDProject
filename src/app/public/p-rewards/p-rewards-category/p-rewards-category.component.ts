import { Component, Input, OnInit } from '@angular/core';
import { UserEntity } from '../../../../core/entity/user.entity';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { RewardEntity } from '../../../../core/entity/reward.entity';
import { RewardsService } from '../../../../core/services/rewards.service';

@Component({
  selector: 'app-p-rewards-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './p-rewards-category.component.html',
  styleUrl: './p-rewards-category.component.scss'
})
export class PRewardsCategoryComponent implements OnInit{
  user!: UserEntity;
  rewards: RewardEntity[] = [];
  constructor(private userService: UserServiceService, private router: Router, private rewardService: RewardsService) {}

  ngOnInit(): void {
    this.userService.getUserConnected().subscribe((user) => {
      this.user = user;
    });
    this.rewardService.getRewardsCategory().subscribe((rewards) => {
      this.rewards = rewards;
      console.log("rewards", this.rewards);
    });
  }

  goToRewardsList(categoryName: string) {
    this.router.navigate(['/rewards/list/', categoryName]);
  }

}
