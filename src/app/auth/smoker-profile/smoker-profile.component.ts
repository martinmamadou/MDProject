import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../core/services/auth-service.service';
import { UserEntity } from '../../../core/entity/user.entity';

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
    const userData = localStorage.getItem('user');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      console.log('Utilisateur inscrit:', this.currentUser);
    }
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

  onSubmit(): void {
    if (this.smokerForm.valid) {
      const formData = this.smokerForm.value;

      // Calcul du score
      let score = 0;

      // Score basé sur la consommation (30% du score total)
      score += formData.packet_per_day * 3;
      score += formData.packet_price * 0.5;
      score += formData.smoker_duration * 2;

      // Score basé sur les habitudes de consommation (20% du score total)
      if (formData.smoking_time === 'morning') score += 5;
      else if (formData.smoking_time === 'evening') score += 3;
      else if (formData.smoking_time === 'all_day') score += 7;

      // Score basé sur la motivation et les tentatives (20% du score total)
      if (formData.smoking_motivation === 'stress') score += 4;
      else if (formData.smoking_motivation === 'social') score += 3;
      else if (formData.smoking_motivation === 'habit') score += 5;

      score += formData.quit_attempts * 3;

      // Score basé sur la santé et l'impact (15% du score total)
      if (formData.health_concerns === 'high') score += 6;
      else if (formData.health_concerns === 'medium') score += 4;
      else if (formData.health_concerns === 'low') score += 2;

      if (formData.smoking_impact === 'severe') score += 5;
      else if (formData.smoking_impact === 'moderate') score += 3;
      else if (formData.smoking_impact === 'mild') score += 1;

      // Score basé sur le système de soutien (5% du score total)
      if (formData.support_system === 'strong') score += 2;
      else if (formData.support_system === 'moderate') score += 1;

      // Score basé sur les objectifs et méthodes (10% du score total)
      if (formData.goal === 'quit_immediately') score += 4;
      else if (formData.goal === 'reduce') score += 2;
      else if (formData.goal === 'maintain') score += 1;

      if (formData.preferred_method === 'cold_turkey') score += 3;
      else if (formData.preferred_method === 'gradual') score += 2;
      else if (formData.preferred_method === 'therapy') score += 1;

      // Impact de la dernière cigarette
      const lastSmoked = new Date(formData.last_cigaret_smoked);
      const now = new Date();
      const hoursSinceLastCigarette = (now.getTime() - lastSmoked.getTime()) / (1000 * 60 * 60);

      if (hoursSinceLastCigarette < 1) score += 5;
      else if (hoursSinceLastCigarette < 4) score += 3;
      else if (hoursSinceLastCigarette < 12) score += 1;

      // Détermination du type de fumeur avec des seuils plus précis
      let smokerType = 'casual';
      if (score > 40) {
        smokerType = 'heavy';
      } else if (score > 25) {
        smokerType = 'moderate';
      }

      // Préparation des données à sauvegarder selon l'entité User
      const userUpdateData = {
        ...this.currentUser,
        smoker_type: smokerType,
        
        user_type: 'smoker'
      };

      // Mise à jour de l'utilisateur
      this.authService.updateUser(userUpdateData).subscribe({
        next: (response) => {
          console.log('Profil fumeur mis à jour avec succès:', response);
          localStorage.setItem('user', JSON.stringify(userUpdateData));
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du profil:', error);
        }
      });
    }
  }
}
