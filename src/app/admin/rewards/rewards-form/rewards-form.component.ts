import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RewardsService } from '../../../../core/services/rewards.service';
import { CommonModule } from '@angular/common';
import { RewardEntity } from '../../../../core/entity/reward.entity';

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

  constructor(
    private fb: FormBuilder,
    private rewardsService: RewardsService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.rewardForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      points_needed: ['', [Validators.required, Validators.min(0)]],
      is_active: [false]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.rewardId = +id;
      this.rewardsService.getRewardById(this.rewardId).subscribe(reward => {
        this.rewardForm.patchValue(reward);
      });
    }
  }

  onSubmit() {
    if (this.rewardForm.valid) {
      const reward: RewardEntity = this.rewardForm.value;

      if (this.isEditMode && this.rewardId) {
        reward.id = this.rewardId;
        this.rewardsService.updateReward(reward).subscribe({
          next: () => this.router.navigate(['/admin/rewards']),
          error: (error) => console.error('Erreur lors de la mise à jour:', error)
        });
      } else {
        this.rewardsService.createReward(reward).subscribe({
          next: () => this.router.navigate(['/admin/rewards']),
          error: (error) => console.error('Erreur lors de la création:', error)
        });
      }
    }
  }
}
