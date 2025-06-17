import { Component, inject, Input } from '@angular/core';
import { UserEntity } from '../../../../core/entity/user.entity';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { CommonModule } from '@angular/common';
import { EmergencyCategoryService } from '../../../../core/services/emergency-category.service';
import { EmergencyService } from '../../../../core/services/emergency.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-p-urgences-category',
  imports: [CommonModule],
  templateUrl: './p-urgences-category.component.html',
  styleUrl: './p-urgences-category.component.scss'
})
export class PUrgencesCategoryComponent {
  user!: UserEntity;
  urgences: any[] = [];
  router = inject(Router);
  constructor(private userService: UserServiceService, private emergencyService: EmergencyService) {
    this.userService.getUserConnected().subscribe((user) => {
      this.user = user;
    });
    this.emergencyService.getEmergencyCategories().subscribe((categories) => {
      this.urgences = categories;
    });
  }

  goToUrgencesList(categoryId: number) {
    this.router.navigate(['/urgences/list/', categoryId]);
  }
}
