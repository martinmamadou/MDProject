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



export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'auth', component: AuthComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent }
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
        
      ] }
    ]},

];
