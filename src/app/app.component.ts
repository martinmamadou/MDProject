import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';
import { UserEntity } from '../core/entity/user.entity';
import { CommonModule, NgFor } from '@angular/common';
import { AuthServiceService } from '../core/services/auth-service.service';
import { NavigationComponent } from "../core/global/navigation/navigation.component";
import { ActiveChallengeComponent } from './shared/active-challenge/active-challenge.component';
import { ChallengeEntity } from '../core/entity/challenge.entity';
import { ChallengeService } from '../core/services/challenge.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, CommonModule, RouterOutlet, NavigationComponent, ActiveChallengeComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'md-client';
  users: UserEntity[] = [];
  challenge!: ChallengeEntity;

  constructor(private dataService: DataService, private authService: AuthServiceService, private challengeService: ChallengeService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(res => {
      this.users = res
    })
    console.log(this.authService.isLoggedIn());
  }



  logout() {
    this.authService.logout();
    console.log('logout success')
  }
}
