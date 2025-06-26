import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../../../core/services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-settings',
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss'
})
export class ProfileSettingsComponent {

  constructor(private AuthService: AuthServiceService, private router: Router) {}

logout() {
  this.AuthService.logout();
  this.router.navigate(['/auth']);
}
goToAccount() {
  this.router.navigate(['/profile/settings/account']);
}
}
