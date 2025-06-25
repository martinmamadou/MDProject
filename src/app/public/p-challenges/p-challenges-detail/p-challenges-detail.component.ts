import { Component } from '@angular/core';
import { ChallengeService } from '../../../../core/services/challenge.service';
import { UserEntity } from '../../../../core/entity/user.entity';
import { ChallengeEntity } from '../../../../core/entity/challenge.entity';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiConfigService } from '../../../../core/services/api-config.service';
import { ActiveChallengeService } from '../../../../core/services/active-challenge.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-p-challenges-detail',
  imports: [CommonModule],
  templateUrl: './p-challenges-detail.component.html',
  styleUrl: './p-challenges-detail.component.scss'
})
export class PChallengesDetailComponent {

  user!: UserEntity;
  challenge!: ChallengeEntity;
  activeChallenge: ChallengeEntity | null = null;
  isChallengeCompleted: boolean = false;

  constructor(
    private challengeService: ChallengeService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserServiceService,
    private apiConfig: ApiConfigService,
    private activeChallengeService: ActiveChallengeService
  ) { }

  ngOnInit(): void {
    this.userService.getUserConnected().subscribe(user => {
      this.user = user;
      if (this.challenge) {
        this.checkChallengeCompletion();
      }
    });

    this.activeChallengeService.getActiveChallenge().subscribe(activeChallenge => {
      this.activeChallenge = activeChallenge;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.challengeService.getChallengeById(+id).subscribe(challenge => {
        this.challenge = {
          ...challenge,
          badge_url: challenge.badge_url ? this.apiConfig.buildImageUrl(challenge.badge_url) : ''
        };
        if (this.user) {
          this.checkChallengeCompletion();
        }
      });
    }
  }

  checkChallengeCompletion() {
    if (this.user && this.challenge) {
      this.challengeService.getUserChallengeByUserAndChallenge(this.user.id, this.challenge.id).subscribe({
        next: (userChallenge) => {
          this.isChallengeCompleted = userChallenge ? userChallenge.is_completed : false;
        },
        error: (error) => {
          console.error('Erreur lors de la vérification de l\'état du défi:', error);
          this.isChallengeCompleted = false;
        }
      });
    }
  }

  acceptChallenge() {
    if (this.challenge && this.user) {
      this.challengeService.acceptChallenge(this.user.id, this.challenge.id).subscribe({
        next: () => {
          this.activeChallengeService.setActiveChallenge(this.challenge);
        },
        error: (error) => {
          console.error('Erreur lors de l\'acceptation du défi:', error);
        }
      });
    }
  }

  finishChallenge() {
    if (this.activeChallenge && this.user) {
      const pointsToAdd = this.activeChallenge.points;
      console.log('🏁 Finishing challenge:', this.activeChallenge);
      this.challengeService.getUserChallengeByUserAndChallenge(this.user.id, this.activeChallenge.id).subscribe({
        next: (userChallenge) => {
          if (userChallenge) {
            this.challengeService.completeUserChallenge(userChallenge.id, pointsToAdd).subscribe({
              next: () => {
                this.updateUserPoints(pointsToAdd);
              },
              error: (error) => {
                console.error('Erreur lors de la mise à jour du user-challenge:', error);
              }
            });
          }
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du user-challenge:', error);
        }
      });
    }
  }

  updateUserPoints(points: number) {
    if (this.user) {
      const newPoints = this.user.points + points;
      this.userService.updateUserPoints(this.user.id, newPoints).subscribe({
        next: () => {
          this.user.points = newPoints;
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour des points:', error);
        }
      });
    }
  }
}


