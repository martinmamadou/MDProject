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
  imageError: string | null = null;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isUploading = false;
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
      is_active: [false],
      estimated_duration: ['', [Validators.required, Validators.min(0)]],
      category_id: ['', Validators.required]
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

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validation du type de fichier
      if (!file.type.match(/image\/(jpeg|png|gif|jpg)/)) {
        this.imageError = 'Seuls les fichiers images (JPEG, PNG, GIF) sont acceptés';
        return;
      }

      // Validation de la taille (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        this.imageError = 'L\'image ne doit pas dépasser 5MB';
        return;
      }

      this.selectedFile = file;
      this.imageError = null;

      // Mettre à jour le champ badge_url du formulaire
      this.challengeForm.patchValue({ badge_url: file.name });

      // Création de l'URL de prévisualisation
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    if (this.challengeForm.valid) {
      this.isUploading = true;
      const challenge: ChallengeEntity = {
        ...this.challengeForm.value,
        category_id: parseInt(this.challengeForm.value.category_id)
      };

      try {
        if (this.isEditMode && this.challengeId) {
          // Si on a une nouvelle image, on l'upload d'abord
          if (this.selectedFile) {
            await this.challengeService.uploadImage(this.challengeId, this.selectedFile).toPromise();
          }
          challenge.id = this.challengeId;
          await this.challengeService.updateChallenge(challenge).toPromise();
        } else {
          // Création d'une nouvelle récompense
          const newChallenge = await this.challengeService.createChallenge(challenge).toPromise();
          // Upload de l'image si elle existe
          if (this.selectedFile && newChallenge?.id) {
            await this.challengeService.uploadImage(newChallenge.id, this.selectedFile).toPromise();
          }
        }
        this.router.navigate(['/admin/challenges']);
      } catch (error) {
        console.error('Erreur:', error);
        this.imageError = 'Une erreur est survenue lors de l\'envoi';
      } finally {
        this.isUploading = false;
      }
    }
  }
}
