import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { AuthServiceService } from '../../../../core/services/auth-service.service';
import { StatsEntity } from '../../../../core/entity/stats.entity';
import { UserEntity } from '../../../../core/entity/user.entity';
import { StatsService } from '../../../../core/services/stats.service';
import { ApiConfigService } from '../../../../core/services/api-config.service';

@Component({
  selector: 'app-profile-infos',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './profile-infos.component.html',
  styleUrl: './profile-infos.component.scss'
})
export class ProfileInfosComponent implements OnInit {
  user?: UserEntity;
  stats?: StatsEntity;
  badges?: any[];

  constructor(
    private UserService: UserServiceService,
    private StatsService: StatsService,
    private AuthService: AuthServiceService,
    private router: Router,
    private apiConfig: ApiConfigService
  ) {
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
    console.log("le badge", this.apiConfig.buildImageUrl(badge.challenge.badge_url));
    return this.apiConfig.buildImageUrl(badge.challenge.badge_url);
  }

  openSettings() {
    console.log("openSettings");
    this.router.navigate(['/profile/settings']);
  }
}
