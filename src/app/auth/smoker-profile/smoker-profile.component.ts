import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../core/services/auth-service.service';
import { UserEntity } from '../../../core/entity/user.entity';

interface SmokerType {
  type: string;
  description: string;
  score: number;
}

@Component({
  selector: 'app-smoker-profile',
  templateUrl: './smoker-profile.component.html',
  styleUrls: ['./smoker-profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SmokerProfileComponent implements OnInit {
  currentUser: UserEntity | null = null;
  smokerForm: FormGroup;
  currentPage: number = 1;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService
  ) {
    this.smokerForm = this.fb.group({
      // Page 1
      packet_per_day: ['', [Validators.required, Validators.min(0)]],
      packet_price: ['', [Validators.required, Validators.min(0)]],
      smoker_duration: ['', [Validators.required, Validators.min(0)]],

      // Page 2
      smoking_time: ['', Validators.required],
      smoking_motivation: ['', Validators.required],
      quit_attempts: ['', Validators.required],

      // Page 3
      health_concerns: ['', Validators.required],
      smoking_impact: ['', Validators.required],
      support_system: ['', Validators.required],

      // Page 4
      goal: ['', Validators.required],
      preferred_method: ['', Validators.required],
      last_cigaret_smoked: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Récupération du profil utilisateur
    this.authService.getProfile().subscribe({
      next: (userData) => {
        this.currentUser = userData;
        console.log('Profil utilisateur chargé:', this.currentUser);
      },
      error: (error) => {
        console.error('Erreur lors du chargement du profil:', error);
        this.router.navigate(['/auth/login']);
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < 4) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  calculateSmokerType(): SmokerType {
    const formData = this.smokerForm.value;
    let score = 0;

    // Calcul basé sur la consommation
    const consumptionScore = this.calculateConsumptionScore(formData);
    score += consumptionScore;

    // Calcul basé sur la motivation
    const motivationScore = this.calculateMotivationScore(formData);
    score += motivationScore;

    // Calcul basé sur l'impact sur la santé
    const healthScore = this.calculateHealthScore(formData);
    score += healthScore;

    // Calcul basé sur les objectifs
    const goalScore = this.calculateGoalScore(formData);
    score += goalScore;

    // Détermination du type de fumeur
    return this.determineSmokerType(score);
  }

  private calculateConsumptionScore(formData: any): number {
    let score = 0;

    // Score basé sur le nombre de paquets par jour
    const packetsPerDay = formData.packet_per_day;
    if (packetsPerDay <= 0.5) score += 1;
    else if (packetsPerDay <= 1) score += 2;
    else if (packetsPerDay <= 2) score += 3;
    else score += 4;

    // Score basé sur la durée de consommation
    const duration = formData.smoker_duration;
    if (duration <= 5) score += 1;
    else if (duration <= 10) score += 2;
    else if (duration <= 20) score += 3;
    else score += 4;

    // Score basé sur le moment de consommation
    switch (formData.smoking_time) {
      case 'morning': score += 3; break;
      case 'afternoon': score += 2; break;
      case 'evening': score += 1; break;
      case 'all_day': score += 4; break;
    }

    return score;
  }

  private calculateMotivationScore(formData: any): number {
    let score = 0;

    // Score basé sur la motivation
    switch (formData.smoking_motivation) {
      case 'stress': score += 3; break;
      case 'social': score += 2; break;
      case 'habit': score += 4; break;
      case 'pleasure': score += 1; break;
    }

    // Score basé sur les tentatives d'arrêt
    switch (formData.quit_attempts) {
      case 'never': score += 1; break;
      case 'once': score += 2; break;
      case 'multiple': score += 3; break;
    }

    return score;
  }

  private calculateHealthScore(formData: any): number {
    let score = 0;

    // Score basé sur les préoccupations de santé
    switch (formData.health_concerns) {
      case 'breathing': score += 4; break;
      case 'energy': score += 3; break;
      case 'stress': score += 2; break;
      case 'none': score += 1; break;
    }

    // Score basé sur l'impact du tabac
    switch (formData.smoking_impact) {
      case 'physical': score += 4; break;
      case 'social': score += 3; break;
      case 'financial': score += 2; break;
      case 'none': score += 1; break;
    }

    return score;
  }

  private calculateGoalScore(formData: any): number {
    let score = 0;

    // Score basé sur l'objectif
    switch (formData.goal) {
      case 'quit': score += 4; break;
      case 'reduce': score += 3; break;
      case 'health': score += 2; break;
      case 'money': score += 1; break;
    }

    // Score basé sur la méthode préférée
    switch (formData.preferred_method) {
      case 'cold_turkey': score += 4; break;
      case 'gradual': score += 3; break;
      case 'substitutes': score += 2; break;
      case 'therapy': score += 1; break;
    }

    return score;
  }

  private determineSmokerType(score: number): SmokerType {
    if (score <= 8) {
      return {
        type: 'casual',
        description: 'Fumeur occasionnel avec une faible dépendance',
        score: score
      };
    } else if (score <= 12) {
      return {
        type: 'regular',
        description: 'Fumeur modéré avec une dépendance moyenne',
        score: score
      };
    } else {
      return {
        type: 'addicted',
        description: 'Fumeur très dépendant nécessitant un accompagnement intensif',
        score: score
      };
    }
  }

  onSubmit(): void {
    if (this.smokerForm.valid) {
      const formData = this.smokerForm.value;
      const smokerType = this.calculateSmokerType();
      console.log('Type de fumeur déterminé:', smokerType);

      // Récupération du profil actuel avant mise à jour
      this.authService.getProfile().subscribe({
        next: (userData) => {
          const updateData = {
            packet_per_day: formData.packet_per_day,
            packet_price: formData.packet_price,
            smoker_duration: formData.smoker_duration,
            goal: formData.goal,
            last_cigaret_smoked: formData.last_cigaret_smoked,
            smoker_type: smokerType.type,
            id: userData.id
          };

          console.log('Données de mise à jour:', updateData);

          this.authService.updateUser(updateData).subscribe({
            next: (response) => {
              console.log('Mise à jour réussie:', response);
              this.router.navigate(['/']);
            },
            error: (error) => {
              console.error('Erreur lors de la mise à jour:', error);
            }
          });
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du profil:', error);
        }
      });
    }
  }
}