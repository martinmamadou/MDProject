import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../../core/services/auth-service.service';

@Component({
  selector: 'app-profile-settings',
  imports: [],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss'
})
export class ProfileSettingsComponent {

  constructor(private AuthService: AuthServiceService, private router: Router) {}

logout() {
  this.AuthService.logout();
  this.router.navigate(['/auth/login']);
}
goToAccount() {
  this.router.navigate(['/profile/settings/account']);
}
}
