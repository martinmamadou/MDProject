import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserEntity } from '../entity/user.entity';
import { map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface LoginResponse {
  access_token: string;
  user: UserEntity;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:3000/auth';
  private apiUrl3 = 'https://md-api.onrender.com/auth';
  private apiUrl2 = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) { }

  public Register(user: UserEntity): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl3}/register`, user).pipe(
      tap((response: LoginResponse) => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/auth/welcome']);
      })
    );
  }

  public Login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<LoginResponse>(`${this.apiUrl3}/login`, credentials).pipe(
      tap((response: LoginResponse) => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        console.log('🔐 Login réussi:', response.user);
        this.router.navigate(['/'])
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
    return this.http.get<UserEntity>(`${this.apiUrl}/profile`)
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
    return this.http.get<UserEntity>(`${this.apiUrl}/profile`).pipe(
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
    console.log('URL de la requête:', `${this.apiUrl2}/edit/${profileData.id}`);

    return this.http.put(`${this.apiUrl2}/edit/${profileData.id}`, profileData);
  }
}
