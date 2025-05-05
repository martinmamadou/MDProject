import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../core/services/user-service.service';
import { UserEntity } from '../../../core/entity/user.entity';
import { StatsEntity } from '../../../core/entity/stats.entity';
import { StatsService } from '../../../core/services/stats.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../core/services/auth-service.service';
@Component({
  selector: 'app-profile',
  imports: [CurrencyPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user?: UserEntity;
  stats?: StatsEntity;
  constructor(private UserService: UserServiceService, private StatsService: StatsService, private AuthService: AuthServiceService, private router: Router) {
  }

  ngOnInit(): void {
    this.UserService.getUserConnected().subscribe((user) => {
      this.user = user;
      this.StatsService.getStatsByUserId(user.id).subscribe((stats) => {
        this.stats = stats;
      });
    });
  }

  logout() {
    this.AuthService.logout();
    this.router.navigate(['/auth/login']);
  }
}
