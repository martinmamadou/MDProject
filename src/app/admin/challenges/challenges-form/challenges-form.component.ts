import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeService } from '../../../../core/services/challenge.service';
import { CommonModule } from '@angular/common';
import { ChallengeEntity } from '../../../../core/entity/challenge.entity';
import { ChallengeCategoryService } from '../../../../core/services/challenge-category.service';
import { ChallengeCategoryEntity } from '../../../../core/entity/challenge-category.entiy';

@Component({
  selector: 'app-challenges-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './challenges-form.component.html',
  styleUrls: ['./challenges-form.component.scss']
})
export class ChallengesFormComponent implements OnInit {
  challengeForm: FormGroup;
  isEditMode = false;
  challengeId: number | null = null;
  categories: ChallengeCategoryEntity[] = [];

  constructor(
    private fb: FormBuilder,
    private challengeService: ChallengeService,
    private challengeCategoryService: ChallengeCategoryService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.challengeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      target: ['', Validators.required],
      points: ['', [Validators.required, Validators.min(0)]],
      badges: ['', Validators.required],
      is_active: [false],
      estimated_duration: ['', [Validators.required, Validators.min(0)]],
      category_id: ['', Validators.required],
      image_url: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Charger les catégories
    this.challengeCategoryService.getChallengeCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.route.params.subscribe(params => {
      console.log('Paramètres reçus:', params);
      if (params['id']) {
        this.challengeId = parseInt(params['id']);
        this.isEditMode = true;
        this.loadChallenge(this.challengeId);
      }
    });
  }

  loadChallenge(id: number) {
    console.log('Chargement du challenge:', id);
    this.challengeService.getChallengeById(id).subscribe({
      next: (challenge) => {
        console.log('Challenge chargé:', challenge);
        this.challengeForm.patchValue(challenge);
      },
      error: (error) => {
        console.error('Erreur lors du chargement:', error);
        this.router.navigate(['/admin/challenges']);
      }
    });
  }

  onSubmit() {
    if (this.challengeForm.valid) {
      const formData = this.challengeForm.value;


      if (this.isEditMode && this.challengeId) {
        const challengeToUpdate: ChallengeEntity = {
          ...formData,
          id: this.challengeId
        };
        console.log('Données de mise à jour:', challengeToUpdate);

        this.challengeService.updateChallenge(challengeToUpdate).subscribe({
          next: () => {
            console.log('Challenge mis à jour avec succès');
            this.router.navigate(['/admin/challenges']);
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour:', error);
          }
        });
      } else {
        console.log('Données de création:', formData);
        this.challengeService.createChallenge(formData).subscribe({
          next: () => {
            console.log('Challenge créé avec succès');
            this.router.navigate(['/admin/challenges']);
          },
          error: (error) => {
            console.error('Erreur lors de la création:', error);
          }
        });
      }
    }
  }
}
