import { Component } from '@angular/core';
import { UserEntity } from '../../core/entity/user.entity';
import { UserServiceService } from '../../core/services/user-service.service';
import { ChallengeEntity } from '../../core/entity/challenge.entity';
import { ChallengeService } from '../../core/services/challenge.service';
import { StatsEntity } from '../../core/entity/stats.entity';
import { StatsService } from '../../core/services/stats.service';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  user!: UserEntity
  challenge!: ChallengeEntity;
  stats!: StatsEntity;
  imageUrl = ('../../assets/img/Logo.png');

  constructor(private userService: UserServiceService, private challengeService: ChallengeService, private statsService: StatsService) {
  }

  ngOnInit(): void {
    this.userService.getUserConnected().subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.loadStats();
    });
    this.loadRandomChallenge();
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
}
