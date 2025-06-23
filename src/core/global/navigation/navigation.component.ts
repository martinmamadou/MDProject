import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { NgIf } from '@angular/common';
import { UserEntity } from '../../entity/user.entity';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  authService = inject(AuthServiceService)
  router = inject(Router)
  user: UserEntity | null = null;

  shouldShowNav(): boolean {
    const currentRoute = this.router.url;
    return !['/auth/login', '/auth/register', '/auth', '/auth/welcome'].includes(currentRoute);
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/auth/login'])
  }

  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
        console.log('Rôle utilisateur:', user.role);
      },
      error: (err) => console.error('Erreur:', err)
    });
  }
}
