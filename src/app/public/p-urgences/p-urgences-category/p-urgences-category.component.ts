import { Component, Input } from '@angular/core';
import { UserEntity } from '../../../../core/entity/user.entity';
import { UserServiceService } from '../../../../core/services/user-service.service';

@Component({
  selector: 'app-p-urgences-category',
  imports: [],
  templateUrl: './p-urgences-category.component.html',
  styleUrl: './p-urgences-category.component.scss'
})
export class PUrgencesCategoryComponent {
  user!: UserEntity;
  constructor(private userService: UserServiceService) {
    this.userService.getUserConnected().subscribe((user) => {
      this.user = user;
    });
  }
}
