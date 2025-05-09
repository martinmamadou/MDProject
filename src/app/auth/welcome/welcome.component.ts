import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../core/services/user-service.service';
import { UserEntity } from '../../../core/entity/user.entity';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-welcome',
  imports: [RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit {
  user!: UserEntity;
  constructor(private userService: UserServiceService) { 
  }

  ngOnInit(): void {
    this.userService.getUserConnected().subscribe((user) => {
      this.user = user;
    })
  }

}
