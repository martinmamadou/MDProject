import { Component } from '@angular/core';
import { UserEntity } from '../../core/entity/user.entity';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { UserServiceService } from '../../core/services/user-service.service';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  user!: UserEntity
  imageUrl = ('../../assets/img/Logo.png');

  constructor(private userService: UserServiceService) {
    this.userService.getUserConnected().subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }
}
