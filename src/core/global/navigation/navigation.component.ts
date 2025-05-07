import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  authService = inject(AuthServiceService)
  router = inject(Router)

  shouldShowNav(): boolean {
    const currentRoute = this.router.url;
    return !['/auth/login', '/auth/register', '/auth'].includes(currentRoute);
  }

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
