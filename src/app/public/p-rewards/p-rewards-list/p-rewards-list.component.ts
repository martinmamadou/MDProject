import { Component, OnInit } from '@angular/core';
import { UserEntity } from '../../../../core/entity/user.entity';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RewardsService } from '../../../../core/services/rewards.service';
import { RewardEntity } from '../../../../core/entity/reward.entity';
import { CommonModule } from '@angular/common';
import { ApiConfigService } from '../../../../core/services/api-config.service';

@Component({
  selector: 'app-p-rewards-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './p-rewards-list.component.html',
  styleUrl: './p-rewards-list.component.scss'
})
export class PRewardsListComponent implements OnInit {
  user!: UserEntity;
  rewards: RewardEntity[] = [];
  categoryName: string = '';
  showModal: boolean = false;
  selectedReward: RewardEntity | null = null;

  constructor(
    private userService: UserServiceService,
    private route: ActivatedRoute,
    private rewardsService: RewardsService,
    private router: Router,
    private apiConfig: ApiConfigService
  ) { }

  ngOnInit(): void {
    this.loadUser();
    this.loadRewardsByCategory();
  }

  private loadUser() {
    this.userService.getUserConnected().subscribe(user => {
      this.user = user;
    });
  }

  private loadRewardsByCategory() {
    this.route.params.subscribe(params => {
      const categoryName = params['category'];
      this.categoryName = categoryName;
      console.log("this.categoryName", this.categoryName);

      this.rewardsService.getRewardsCategory().subscribe(categories => {
        console.log("Noms des catégories:", categories.map(cat => cat.name));
        const category = categories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
        console.log("Catégorie trouvée:", category);

        if (category) {
          this.rewardsService.getRewardsByCategory(category.id).subscribe(rewards => {
            console.log("Récompenses trouvées:", rewards);
            // Construire l'URL complète pour chaque récompense
            this.rewards = rewards.map(reward => ({
              ...reward,
              image_url: reward.image_url ? this.apiConfig.buildImageUrl(reward.image_url) : ''
            }));
            console.log("les rewards", this.rewards);
          });
        }
      });
    });
  }

  openModal(reward: RewardEntity) {
    this.selectedReward = reward;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedReward = null;
  }

  exchangeReward(reward: RewardEntity) {
    if (this.user.points >= reward.points_needed) {
      this.rewardsService.exchangeReward(this.user.id, reward.id).subscribe({
        next: () => {
          console.log('Récompense échangée avec succès');
          this.closeModal();
          // Recharger les données utilisateur pour mettre à jour les points
          this.loadUser();
        },
        error: (error) => {
          console.error('Erreur lors de l\'échange:', error);
        }
      });
    } else {
      console.log('Points insuffisants');
    }
  }

  navigateToRewardDetails(rewardId: number) {
    this.router.navigate(['/rewards/details', rewardId]);
  }
}
