import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../core/services/auth-service.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  constructor(private authService: AuthServiceService) { }

  logout() {
    this.authService.logout();
    console.log('logout success')
  }

}
