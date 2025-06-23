import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  constructor() { }

  /**
   * Retourne l'URL de base de l'API selon l'environnement
   */
  getApiUrl(): string {
    return environment.apiUrl;
  }

  /**
   * Retourne l'URL pour les uploads selon l'environnement
   */
  getUploadsUrl(): string {
    return environment.uploadsUrl;
  }

  /**
   * Construit une URL complète pour un endpoint spécifique
   * @param endpoint - L'endpoint de l'API (ex: '/auth', '/users')
   * @returns L'URL complète
   */
  buildApiUrl(endpoint: string): string {
    return `${this.getApiUrl()}${endpoint}`;
  }

  /**
   * Construit une URL complète pour une image uploadée
   * @param imagePath - Le chemin de l'image
   * @returns L'URL complète de l'image
   */
  buildImageUrl(imagePath: string): string {
    return `${this.getUploadsUrl()}/${imagePath}`;
  }

  /**
   * Vérifie si on est en mode production
   */
  isProduction(): boolean {
    return environment.production;
  }
} 