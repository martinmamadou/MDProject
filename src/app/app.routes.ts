import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './guards/auth.guard';
import { LandingComponent } from './auth/landing/landing.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './admin/users/users.component';
import { adminGuard } from './guards/admin.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { ChallengesComponent } from './admin/challenges/challenges.component';
import { ChallengesFormComponent } from './admin/challenges/challenges-form/challenges-form.component';
import { StatsComponent } from './admin/stats/stats.component';
import { RewardsComponent } from './admin/rewards/rewards.component';
import { RewardsFormComponent } from './admin/rewards/rewards-form/rewards-form.component';
import { EmergencyComponent } from './admin/emergency/emergency.component';
import { EmergencyFormComponent } from './admin/emergency/emergency-form/emergency-form.component';
import { ProfileComponent } from './public/profile/profile.component';
import { PChallengesComponent } from './public/p-challenges/p-challenges.component';
import { WelcomeComponent } from './auth/welcome/welcome.component';
import { PChallengesListComponent } from './public/p-challenges/p-challenges-list/p-challenges-list.component';
import { PChallengesCategoryComponent } from './public/p-challenges/p-challenges-category/p-challenges-category.component';
import { PRewardsComponent } from './public/p-rewards/p-rewards.component';
import { PRewardsListComponent } from './public/p-rewards/p-rewards-list/p-rewards-list.component';
import { PRewardsCategoryComponent } from './public/p-rewards/p-rewards-category/p-rewards-category.component';
import { RewardDetailComponent } from './public/p-rewards/reward-detail/reward-detail.component';
import { SmokerProfileComponent } from './auth/smoker-profile/smoker-profile.component';
import { ProfileSettingsComponent } from './public/profile/profile-settings/profile-settings.component';
import { ProfileInfosComponent } from './public/profile/profile-infos/profile-infos.component';
import { CompteComponent } from './public/profile/compte/compte.component';
import { PUrgencesComponent } from './public/p-urgences/p-urgences.component';
import { PUrgencesCategoryComponent } from './public/p-urgences/p-urgences-category/p-urgences-category.component';
import { PUrgencesListComponent } from './public/p-urgences/p-urgences-list/p-urgences-list.component';
import { EmotionComponent } from './auth/emotion/emotion.component';
import { PChallengesDetailComponent } from './public/p-challenges/p-challenges-detail/p-challenges-detail.component';


export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'auth', component: AuthComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent }, 
      { path: 'welcome', component: WelcomeComponent }
    ]
  },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard], 
    children :  [
      { path: '', component: AdminHomeComponent },
      { path: 'userlist', component: UsersComponent },
      { path: 'challenges', component: ChallengesComponent,
        children: [
          { path: 'create', component: ChallengesFormComponent },
          { path: 'edit/:id', component: ChallengesFormComponent }
        ]
      },
      { path: 'stats', component: StatsComponent, children: [
        
      ] },
      { path: 'rewards', component: RewardsComponent, children: [
        { path: 'create', component: RewardsFormComponent },
        { path: 'edit/:id', component: RewardsFormComponent }
      ] },
      
      { path: 'emergency', component: EmergencyComponent, children: [
        { path: 'create', component: EmergencyFormComponent },
        { path: 'edit/:id', component: EmergencyFormComponent }
      ] }

    ]
  },
    {
      path :'profile', component: ProfileComponent, canActivate: [authGuard], children: [
        {path: '', component: ProfileInfosComponent},
        {path: 'settings', component: ProfileSettingsComponent}
      ]
    },
    {
      path: 'profile/settings/account', component: CompteComponent
    },
    {
      path :'challenges', component: PChallengesComponent, canActivate: [authGuard], children: [
        {path: 'list/:category', component: PChallengesListComponent},
        {path: 'details/:id', component: PChallengesDetailComponent},
        {path: '', component: PChallengesCategoryComponent}
      ]
    },
    {
      path :'rewards', component : PRewardsComponent, canActivate: [authGuard], children: [
        {path:'', component: PRewardsCategoryComponent},
        {path: 'list/:category', component: PRewardsListComponent},
        {path: 'details/:id', component: RewardDetailComponent}
      ]

    },
    {
      path :'urgences', component: PUrgencesComponent, canActivate: [authGuard], children: [
        {path: '', component: PUrgencesCategoryComponent},
        {path: 'list/:category', component: PUrgencesListComponent}
      ]
    },
    {
      path :'smoker-profile', component: SmokerProfileComponent
    },
    {
      path :'emotion', component: EmotionComponent
    }
    
    
];
