import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';
import { UserEntity } from '../core/entity/user.entity';
import { CommonModule, NgFor } from '@angular/common';
import { AuthServiceService } from '../core/services/auth-service.service';
import { NavigationComponent } from "../core/global/navigation/navigation.component";

@Component({
  selector: 'app-root',
  imports: [NgFor, CommonModule, RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'md-client';
  users: UserEntity[] = [];

  constructor(private dataService: DataService, private authService: AuthServiceService) { }

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
