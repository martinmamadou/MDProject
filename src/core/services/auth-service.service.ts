import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserEntity } from '../entity/user.entity';
import { map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ApiConfigService } from './api-config.service';
import { UserServiceService } from './user-service.service';

interface LoginResponse {
  access_token: string;
  user: UserEntity;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiConfig: ApiConfigService,
    private userService: UserServiceService
  ) { }

  public Register(user: UserEntity): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiConfig.buildApiUrl('/auth')}/register`, user).pipe(
      tap((response: LoginResponse) => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/auth/welcome']);
      })
    );
  }

  public Login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<LoginResponse>(`${this.apiConfig.buildApiUrl('/auth')}/login`, credentials).pipe(
      tap((response: LoginResponse) => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        console.log('🔐 Login réussi:', response.user);
        this.router.navigate(['/']);

        // Vérifier si c'est une nouvelle date pour rediriger vers /emotion
        // this.emotion().subscribe((isNewDate) => {
        //   if (isNewDate) {
        //     console.log('🔄 Nouvelle date détectée, redirection vers /emotion');
        //     this.router.navigate(['/emotion']);
        //   } else {
        //     console.log('📅 Même date, redirection vers /');
        //     this.router.navigate(['/']);
        //   }
        // });
      })
    );
  }

  public emotion(): Observable<boolean> {
    return this.userService.getUserConnected().pipe(
      map(user => {
        const today = new Date().toISOString();
        const lastLoginDate = user.login_date ? new Date(user.login_date).toISOString() : null;

        const areDatesDifferent = lastLoginDate !== today;
        console.log('📅 Dates différentes (secondes):', areDatesDifferent, { today, lastLoginDate });
        return areDatesDifferent;
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    console.log('🚪 Déconnexion effectuée');
  }

  isLoggedIn(): boolean {
    const isLogged = !!localStorage.getItem('access_token');
    console.log('📍 Est connecté:', isLogged);
    return isLogged;
  }

  public getCurrentUser(): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${this.apiConfig.buildApiUrl('/auth')}/profile`)
  }

  public isAdmin(): Observable<boolean> {
    return this.getProfile().pipe(
      map(user => {
        const isAdmin = user.role === 'admin';
        console.log('🎯 Vérification admin:', { role: user.role, isAdmin });
        return isAdmin;
      })
    );
  }

  public getProfile(): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${this.apiConfig.buildApiUrl('/auth')}/profile`).pipe(
      tap(user => console.log('👤 Profil récupéré:', user))
    );
  }

  public updateUser(profileData: any): Observable<any> {
    if (!profileData.id) {
      console.error('ID manquant dans les données de mise à jour');
      return new Observable(subscriber => {
        subscriber.error('ID manquant dans les données de mise à jour');
      });
    }

    console.log('Envoi de la requête de mise à jour avec les données:', profileData);
    console.log('URL de la requête:', `${this.apiConfig.buildApiUrl('/users')}/edit/${profileData.id}`);

    return this.http.put(`${this.apiConfig.buildApiUrl('/users')}/edit/${profileData.id}`, profileData);
  }
}
