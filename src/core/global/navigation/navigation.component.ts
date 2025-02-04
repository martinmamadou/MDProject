import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  authService = inject(AuthServiceService)
  router = inject(Router)

  logout() {
    this.authService.logout()
    this.router.navigate(['/auth/login'])
  }

  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (user) => {
        console.log('Rôle utilisateur:', user.role);
      },
      error: (err) => console.error('Erreur:', err)
    });
  }

}
