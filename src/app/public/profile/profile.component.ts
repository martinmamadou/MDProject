import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../core/services/user-service.service';
import { UserEntity } from '../../../core/entity/user.entity';
import { StatsEntity } from '../../../core/entity/stats.entity';
import { StatsService } from '../../../core/services/stats.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../core/services/auth-service.service';
import { RewardEntity } from '../../../core/entity/reward.entity';
@Component({
  selector: 'app-profile',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user?: UserEntity;
  stats?: StatsEntity;
  badges?: any[];
  constructor(private UserService: UserServiceService, private StatsService: StatsService, private AuthService: AuthServiceService, private router: Router) {
  }

  ngOnInit(): void {
    this.UserService.getUserConnected().subscribe((user) => {
      this.user = user;
      this.StatsService.getStatsByUserId(user.id).subscribe((stats) => {
        this.stats = stats;
      });
      this.UserService.getUserBadges(user.id).subscribe((badges) => {
        this.badges = badges;
        console.log("le badge", this.badges);
      });
    });
  }

  getBadgeImage(badge: any): string {
    console.log("le badge", `http://localhost:3000/uploads/${badge.challenge.badge_url}`);
    return `${badge.challenge.badge_url}`;
  }


  logout() {
    this.AuthService.logout();
    this.router.navigate(['/auth/login']);
  }
}
