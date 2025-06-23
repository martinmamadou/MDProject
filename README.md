# MD-Client - Application de Cessation Tabagique

## 📋 Description

MD-Client est une application web Angular moderne conçue pour accompagner les utilisateurs dans leur processus de cessation tabagique. L'application propose un système complet de défis, récompenses, et outils d'urgence pour soutenir les fumeurs dans leur démarche d'arrêt du tabac.

## 🏗️ Architecture

### Structure du Projet

ng test --include="**/home.component.spec.ts" --watch=false

```
md-client/
├── src/
│   ├── app/
│   │   ├── admin/                 # Interface d'administration
│   │   ├── auth/                  # Authentification et inscription
│   │   ├── home/                  # Page d'accueil utilisateur
│   │   ├── public/                # Pages publiques utilisateur
│   │   ├── shared/                # Composants partagés
│   │   └── guards/                # Guards de sécurité
│   ├── core/
│   │   ├── entity/                # Entités TypeScript
│   │   ├── services/              # Services métier
│   │   └── global/                # Composants globaux
│   └── assets/                    # Ressources statiques
```

### Technologies Utilisées

- **Frontend**: Angular 19.0.0
- **Authentification**: JWT (JSON Web Tokens)
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router
- **Reactive Forms**: Angular Forms
- **Styling**: SCSS
- **État**: RxJS BehaviorSubject

## 🚀 Fonctionnalités

### 👤 Authentification et Gestion des Utilisateurs

- **Inscription**: Création de compte avec profil fumeur
- **Connexion**: Authentification sécurisée avec JWT
- **Profil utilisateur**: Gestion des informations personnelles
- **Types de fumeurs**: Classification selon le profil tabagique

### 🎯 Système de Défis

- **Défis par catégorie**: Organisation thématique des défis
- **Défis actifs**: Suivi en temps réel des défis en cours
- **Validation automatique**: Système de validation basé sur le temps
- **Points de récompense**: Attribution de points pour les défis complétés

### 🏆 Système de Récompenses

- **Récompenses par catégorie**: Organisation des récompenses
- **Échange de points**: Utilisation des points gagnés
- **Images de récompenses**: Gestion des visuels
- **Historique des récompenses**: Suivi des récompenses obtenues

### 🚨 Système d'Urgences

- **Conseils d'urgence**: Aide immédiate en cas de tentation
- **Catégories d'urgence**: Organisation des conseils par situation
- **Accès rapide**: Interface dédiée aux moments difficiles

### 📊 Statistiques et Suivi

- **Statistiques personnelles**:
  - Cigarettes évitées
  - Argent économisé
  - Jours sans fumer
- **Tableau de bord**: Vue d'ensemble des progrès

### 👨‍💼 Interface d'Administration

- **Gestion des utilisateurs**: Liste et modification des comptes
- **Gestion des défis**: CRUD complet des défis
- **Gestion des récompenses**: CRUD complet des récompenses
- **Gestion des urgences**: CRUD complet des conseils d'urgence
- **Statistiques globales**: Vue d'ensemble de la plateforme

## 🔧 Installation et Configuration

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn
- Angular CLI

### Installation

1. **Cloner le repository**

   ```bash
   git clone [URL_DU_REPO]
   cd md-client
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Configuration de l'environnement**

   Assurez-vous que l'API backend est configurée et accessible sur `http://localhost:3000`

4. **Lancer l'application**

   ```bash
   npm start
   ```

   L'application sera accessible sur `http://localhost:4200`

### Scripts Disponibles

- `npm start` : Lance le serveur de développement
- `npm run build` : Compile l'application pour la production
- `npm run test` : Lance les tests unitaires
- `npm run watch` : Compile en mode watch

## 🏛️ Architecture Détaillée

### Entités (Entities)

#### UserEntity

```typescript
{
  id: number;
  username: string;
  email: string;
  role: string;
  smoker_type: string;
  packet_per_day: number;
  packet_price: number;
  smoke_duration: number;
  goal: string;
  last_cigaret_smoked: Date;
  points: number;
  user_type: string;
  password: string;
  created_at: Date;
  login_date: Date;
  stats: StatsEntity[];
}
```

#### ChallengeEntity

```typescript
{
  id: number;
  name: string;
  description: string;
  difficulty: string;
  points: number;
  badges: string;
  is_active: boolean;
  target: string;
  estimated_duration: number;
  category_id: number;
}
```

#### RewardEntity

```typescript
{
  id: number;
  name: string;
  description: string;
  points_needed: number;
  is_active: boolean;
  category_id: number;
  image_url: string;
}
```

#### EmergencyEntity

```typescript
{
  id: number;
  name: string;
  description: string;
  tips: string;
  category: string;
}
```

#### StatsEntity

```typescript
{
  id_stats: number;
  cigaret_avoided: number;
  money_saved: number;
  days_without_smoking: number;
  user: UserEntity;
}
```

### Services Principaux

#### AuthServiceService

Gère l'authentification et l'autorisation :

- Inscription et connexion
- Gestion des tokens JWT
- Vérification des rôles (admin/user)
- Mise à jour du profil utilisateur

#### ChallengeService

Gère les défis :

- CRUD des défis
- Attribution des défis aux utilisateurs
- Validation et complétion des défis
- Sélection aléatoire de défis

#### RewardsService

Gère les récompenses :

- CRUD des récompenses
- Attribution des récompenses aux utilisateurs
- Upload d'images
- Gestion des catégories

#### EmergencyService

Gère les conseils d'urgence :

- CRUD des conseils
- Organisation par catégories
- Accès rapide aux conseils

#### StatsService

Gère les statistiques :

- Récupération des statistiques utilisateur
- Statistiques globales pour l'admin

#### ActiveChallengeService

Gère les défis actifs :

- Suivi en temps réel des défis en cours
- Timer automatique
- Validation automatique à la fin du défi
- Persistance dans le localStorage

### Guards de Sécurité

#### authGuard

Protège les routes nécessitant une authentification :

- Vérifie la présence du token JWT
- Redirige vers la page de connexion si non authentifié

#### adminGuard

Protège les routes d'administration :

- Vérifie le rôle admin de l'utilisateur
- Redirige vers la page d'accueil si non autorisé

## 🛣️ Routes de l'Application

### Routes Publiques

- `/auth` : Page d'accueil d'authentification
- `/auth/login` : Connexion
- `/auth/register` : Inscription
- `/auth/welcome` : Page de bienvenue
- `/smoker-profile` : Profil fumeur

### Routes Utilisateur (Authentifiées)

- `/` : Page d'accueil utilisateur
- `/profile` : Profil utilisateur
- `/profile/settings` : Paramètres du profil
- `/profile/settings/account` : Gestion du compte
- `/challenges` : Liste des défis par catégorie
- `/challenges/list/:category` : Liste des défis d'une catégorie
- `/rewards` : Liste des récompenses par catégorie
- `/rewards/list/:category` : Liste des récompenses d'une catégorie
- `/rewards/details/:id` : Détails d'une récompense
- `/urgences` : Liste des conseils d'urgence par catégorie
- `/urgences/list/:category` : Liste des conseils d'une catégorie

### Routes Admin (Authentifiées + Admin)

- `/admin` : Dashboard administrateur
- `/admin/userlist` : Gestion des utilisateurs
- `/admin/challenges` : Gestion des défis
- `/admin/challenges/create` : Création de défi
- `/admin/challenges/edit/:id` : Modification de défi
- `/admin/rewards` : Gestion des récompenses
- `/admin/rewards/create` : Création de récompense
- `/admin/rewards/edit/:id` : Modification de récompense
- `/admin/emergency` : Gestion des urgences
- `/admin/emergency/create` : Création d'urgence
- `/admin/emergency/edit/:id` : Modification d'urgence
- `/admin/stats` : Statistiques globales

## 🎨 Composants Principaux

### Composants Globaux

- **NavigationComponent** : Barre de navigation principale
- **ActiveChallengeComponent** : Affichage du défi actif avec timer
- **FlashMessagesComponent** : Messages de notification

### Composants d'Authentification

- **AuthComponent** : Conteneur d'authentification
- **LoginComponent** : Formulaire de connexion
- **RegisterComponent** : Formulaire d'inscription
- **LandingComponent** : Page d'accueil d'authentification
- **WelcomeComponent** : Page de bienvenue
- **SmokerProfileComponent** : Profil fumeur

### Composants Utilisateur

- **HomeComponent** : Dashboard utilisateur
- **ProfileComponent** : Gestion du profil
- **PChallengesComponent** : Interface des défis
- **PRewardsComponent** : Interface des récompenses
- **PUrgencesComponent** : Interface des urgences

### Composants Admin

- **AdminComponent** : Conteneur d'administration
- **AdminHomeComponent** : Dashboard administrateur
- **UsersComponent** : Gestion des utilisateurs
- **ChallengesComponent** : Gestion des défis
- **RewardsComponent** : Gestion des récompenses
- **EmergencyComponent** : Gestion des urgences
- **StatsComponent** : Statistiques

## 🔐 Sécurité

### Authentification

- Utilisation de JWT pour l'authentification
- Stockage sécurisé des tokens dans le localStorage
- Vérification automatique de l'expiration des tokens

### Autorisation

- Système de rôles (admin/user)
- Guards de protection des routes
- Vérification des permissions côté client

### Protection des Données

- Validation des formulaires côté client
- Sanitisation des données d'entrée
- Gestion sécurisée des uploads d'images

## 📱 Responsive Design

L'application n'est pas conçue pour être responsive elle n'est adapter que pour le mobile :

- Mobile (< 768px)

## 🧪 Tests

### Tests Unitaires

```bash
npm run test
```

### Tests de Couverture

```bash
npm run test -- --code-coverage
```

## 🚀 Déploiement

### Build de Production

```bash
npm run build
```

### Variables d'Environnement

Assurez-vous de configurer les variables d'environnement pour la production :

- URL de l'API backend
- Clés de sécurité
- Configuration des services externes

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence [MIT](LICENSE).

## 👥 Équipe

- **Développeur Principal** : [Votre Nom]
- **Designer UI/UX** : [Nom du Designer]
- **Testeur** : [Nom du Testeur]

## 📞 Support

Pour toute question ou problème :

- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement
- Consulter la documentation technique

---

**MD-Client** - Votre compagnon pour arrêter de fumer 🚭
