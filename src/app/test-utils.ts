import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Configuration commune pour les tests Angular
 * Inclut les modules nécessaires pour la plupart des composants
 */
export const configureTestingModule = (imports: any[] = [], providers: any[] = []) => {
  return TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,  // Pour HttpClient
      RouterTestingModule,      // Pour Router et ActivatedRoute
      NoopAnimationsModule,     // Pour les animations
      ...imports
    ],
    providers: [
      ...providers
    ]
  });
}; 