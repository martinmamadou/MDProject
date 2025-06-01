import { Component } from '@angular/core';
import { UserEntity } from '../../core/entity/user.entity';
import { UserServiceService } from '../../core/services/user-service.service';
import { ChallengeEntity } from '../../core/entity/challenge.entity';
import { ChallengeService } from '../../core/services/challenge.service';
import { StatsEntity } from '../../core/entity/stats.entity';
import { StatsService } from '../../core/services/stats.service';
import { RewardEntity } from '../../core/entity/reward.entity';
import { RewardsService } from '../../core/services/rewards.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  user!: UserEntity
  challenge!: ChallengeEntity;
  rewards!: RewardEntity[];
  stats!: StatsEntity;
  imageUrl = ('../../assets/img/Logo.png');

  constructor(
    private userService: UserServiceService,
    private challengeService: ChallengeService,
    private statsService: StatsService,
    private rewardService: RewardsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userService.getUserConnected().subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.loadStats();
    });
    this.loadRandomChallenge();
    this.loadRewards();
  }

  loadRandomChallenge() {
    this.challengeService.loadRandomChallenge().subscribe(res => {
      this.challenge = res;
      console.log(this.challenge);
    });
  }

  loadStats() {
    this.statsService.getStatsByUserId(this.user.id).subscribe(res => {
      this.stats = res;
      console.log(this.stats);
    });
  }

  loadRewards() {
    this.rewardService.LoadRandomRewardLimit5().subscribe(res => {
      this.rewards = res;
      console.log(this.rewards);
    });
  }

  getRewardImage(reward: RewardEntity): string {
    return `http://localhost:3000/uploads/${reward.image_url}`;
  }

  goToReward(reward: RewardEntity) {
    this.router.navigate(['/rewards/details', reward.id]);
  }
}

