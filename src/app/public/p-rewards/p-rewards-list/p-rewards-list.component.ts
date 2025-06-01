import { Component, OnInit } from '@angular/core';
import { UserEntity } from '../../../../core/entity/user.entity';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { RewardsService } from '../../../../core/services/rewards.service';
import { RewardEntity } from '../../../../core/entity/reward.entity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-p-rewards-list',
  standalone: true,
  imports: [CommonModule],
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
  ) { }

  ngOnInit() {
    this.userService.getUserConnected().subscribe((user) => {
      this.user = user;
    });
    this.loadRewardsByCategory();
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
            this.rewards = rewards;
          });
        }
      });
    });
  }
   
}
