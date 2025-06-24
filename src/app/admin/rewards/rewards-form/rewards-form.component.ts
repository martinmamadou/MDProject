import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RewardsService } from '../../../../core/services/rewards.service';
import { CommonModule } from '@angular/common';
import { RewardEntity } from '../../../../core/entity/reward.entity';
import { RewardCategoryEntity } from '../../../core/entity/reward-category.entity';
import { ApiConfigService } from '../../../../core/services/api-config.service';

@Component({
  selector: 'app-rewards-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './rewards-form.component.html',
  styleUrls: ['./rewards-form.component.scss']
})
export class RewardsFormComponent implements OnInit {
  rewardForm: FormGroup;
  isEditMode = false;
  rewardId: number | null = null;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  imageError: string | null = null;
  isUploading = false;
  categories: RewardCategoryEntity[] = [];

  constructor(
    private fb: FormBuilder,
    private rewardsService: RewardsService,
    private route: ActivatedRoute,
    public router: Router,
    private apiConfigService: ApiConfigService
  ) {
    this.rewardForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      points_needed: ['', [Validators.required, Validators.min(0)]],
      is_active: [false],
      category_id: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.rewardsService.getRewardsCategory().subscribe(categories => {
      this.categories = categories;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.rewardId = +id;
      this.rewardsService.getRewardById(this.rewardId).subscribe(reward => {
        this.rewardForm.patchValue(reward);
        if (reward.image_url) {
          this.previewUrl = this.apiConfigService.buildImageUrl(reward.image_url);
        }
      });
    }
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

      // Création de l'URL de prévisualisation
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    if (this.rewardForm.valid) {
      this.isUploading = true;
      const reward: RewardEntity = {
        ...this.rewardForm.value,
        category_id: parseInt(this.rewardForm.value.category_id)
      };

      try {
        if (this.isEditMode && this.rewardId) {
          // Si on a une nouvelle image, on l'upload d'abord
          if (this.selectedFile) {
            await this.rewardsService.uploadImage(this.rewardId, this.selectedFile).toPromise();
          }
          reward.id = this.rewardId;
          await this.rewardsService.updateReward(reward).toPromise();
        } else {
          // Création d'une nouvelle récompense
          const newReward = await this.rewardsService.createReward(reward).toPromise();
          // Upload de l'image si elle existe
          if (this.selectedFile && newReward?.id) {
            await this.rewardsService.uploadImage(newReward.id, this.selectedFile).toPromise();
          }
        }
        this.router.navigate(['/admin/rewards']);
      } catch (error) {
        console.error('Erreur:', error);
        this.imageError = 'Une erreur est survenue lors de l\'envoi';
      } finally {
        this.isUploading = false;
      }
    }
  }
}