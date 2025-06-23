# Configuration des Environnements - MD Client

## Vue d'ensemble

Ce projet utilise un système de configuration d'environnement pour gérer automatiquement les URLs d'API selon l'environnement (développement ou production).

## Structure des fichiers

```
src/environments/
├── environment.ts          # Configuration pour le développement
└── environment.prod.ts     # Configuration pour la production
```

## Configuration des environnements

### Développement (`environment.ts`)

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000",
  uploadsUrl: "http://localhost:3000/uploads",
};
```

### Production (`environment.prod.ts`)

```typescript
export const environment = {
  production: true,
  apiUrl: "https://md-api.onrender.com",
  uploadsUrl: "https://md-api.onrender.com/uploads",
};
```

## Service de configuration d'API

Le service `ApiConfigService` centralise la gestion des URLs d'API :

```typescript
@Injectable({
  providedIn: "root",
})
export class ApiConfigService {
  getApiUrl(): string; // URL de base de l'API
  getUploadsUrl(): string; // URL pour les uploads
  buildApiUrl(endpoint: string): string; // Construit une URL complète
  buildImageUrl(imagePath: string): string; // Construit une URL d'image
  isProduction(): boolean; // Vérifie si on est en production
}
```

## Utilisation dans les services

### Avant (URLs codées en dur)

```typescript
private apiUrl = 'http://localhost:3000/auth';

constructor(private http: HttpClient) { }

login(credentials: any) {
  return this.http.post(`${this.apiUrl}/login`, credentials);
}
```

### Après (Configuration centralisée)

```typescript
constructor(
  private http: HttpClient,
  private apiConfig: ApiConfigService
) { }

login(credentials: any) {
  return this.http.post(`${this.apiConfig.buildApiUrl('/auth')}/login`, credentials);
}
```

## Utilisation dans les composants

### Pour les images

```typescript
constructor(private apiConfig: ApiConfigService) { }

getImageUrl(imagePath: string): string {
  return this.apiConfig.buildImageUrl(imagePath);
}
```

## Commandes de build

### Développement

```bash
npm start
# ou
ng serve
```

Utilise automatiquement `environment.ts`

### Production

```bash
npm run build
# ou
ng build --configuration=production
```

Remplace automatiquement `environment.ts` par `environment.prod.ts`

## Avantages

1. **Gestion centralisée** : Toutes les URLs d'API sont gérées depuis un seul endroit
2. **Changement automatique** : Pas besoin de modifier le code pour changer d'environnement
3. **Sécurité** : Les URLs de production ne sont pas exposées en développement
4. **Maintenance** : Facile de modifier les URLs pour tous les services
5. **Flexibilité** : Possibilité d'ajouter d'autres environnements (staging, test, etc.)

## Ajout d'un nouvel environnement

1. Créer un nouveau fichier `environment.staging.ts`
2. Ajouter la configuration dans `angular.json`
3. Utiliser `ng build --configuration=staging`

## Migration des services existants

Tous les services ont été migrés pour utiliser le `ApiConfigService`. Si vous ajoutez un nouveau service :

1. Injecter `ApiConfigService` dans le constructeur
2. Remplacer les URLs codées en dur par `this.apiConfig.buildApiUrl('/endpoint')`
3. Pour les images, utiliser `this.apiConfig.buildImageUrl(imagePath)`

## Vérification

Pour vérifier que la configuration fonctionne :

1. En développement : `npm start` → URLs locales
2. En production : `npm run build` → URLs de production
3. Vérifier dans la console du navigateur que les bonnes URLs sont utilisées
