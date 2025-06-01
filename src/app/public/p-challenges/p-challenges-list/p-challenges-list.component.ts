import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ChallengeEntity } from '../../../../core/entity/challenge.entity';
import { UserEntity } from '../../../../core/entity/user.entity';
import { ChallengeService } from '../../../../core/services/challenge.service';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { CommonModule } from '@angular/common';
import { UserChallengeEntity } from '../../../../core/entity/user-challenge.entity';
import { StorageService } from '../../../../core/services/storage.service';
import { ChallengeCategoryService } from '../../../../core/services/challenge-category.service';
import { ActiveChallengeService } from '../../../../core/services/active-challenge.service';

@Component({
  selector: 'app-p-challenges-list',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './p-challenges-list.component.html',
  styleUrl: './p-challenges-list.component.scss'
})
export class PChallengesListComponent implements OnInit, OnDestroy {

  challenges: ChallengeEntity[] = [];
  user!: UserEntity;
  userChallenge!: UserChallengeEntity;
  showModal: boolean = false;
  selectedChallenge: ChallengeEntity | null = null;
  activeChallenge: ChallengeEntity | null = null;
  hasActiveChallenge: boolean = false;
  duration: number = 0;

  constructor(
    private challengeService: ChallengeService,
    private userService: UserServiceService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private challengeCategoryService: ChallengeCategoryService,
    private activeChallengeService: ActiveChallengeService
  ) { }

  ngOnInit() {
    // Vérifier d'abord s'il y a un défi actif dans le localStorage
    const savedChallenge = localStorage.getItem('activeChallenge');
    const savedStartTime = localStorage.getItem('challengeStartTime');

    if (savedChallenge && savedStartTime) {
      const challenge = JSON.parse(savedChallenge);
      this.activeChallenge = challenge;
      this.hasActiveChallenge = true;
    }

    // S'abonner aux changements du défi actif
    this.activeChallengeService.getActiveChallenge().subscribe(challenge => {
      this.activeChallenge = challenge;
      this.hasActiveChallenge = !!challenge;
    });

    // S'abonner aux changements de la durée
    this.activeChallengeService.getDuration().subscribe(duration => {
      this.duration = duration;
    });

    // Charger les défis et l'utilisateur
    this.loadUserAndChallenges();
  }

  ngOnDestroy() {
    // Pas besoin de nettoyer le timer car il est géré par le service
  }

  private loadUserAndChallenges() {
    this.route.params.subscribe(params => {
      const categoryName = params['category'];
      this.userService.getUserConnected().subscribe({
        next: (user) => {
          this.user = user;
          if (user.smoker_type) {
            this.challengeCategoryService.getChallengeCategories().subscribe(categories => {
              const category = categories.find(cat => cat.name === categoryName);
              console.log("oui",category);
              if (category) {
                this.challengeService.getChallengeByCategory(category.id).subscribe(categoryChallenges => {
                  console.log('📋 Challenges par catégorie:', categoryChallenges);
                  this.challenges = categoryChallenges.filter(challenge =>
                    challenge.target === user.smoker_type
                  );
                  console.log('📋 Challenges filtrés:', this.challenges);

                  // Ne pas réinitialiser le défi actif s'il existe déjà
                  if (!this.hasActiveChallenge) {
                    this.checkActiveChallenges();
                  }
                });
              }
            });
          }
        },
        error: (error) => {
          console.error('Erreur lors du chargement de l\'utilisateur:', error);
        }
      });
    });
  }

  private checkActiveChallenges() {
    if (!this.user) return;
    console.log('🔍 Checking active challenges...');

    const checkPromises = this.challenges.map(challenge => {
      return new Promise<void>((resolve) => {
        this.challengeService.getUserChallengeByUserAndChallenge(this.user.id, challenge.id).subscribe({
          next: (userChallenge) => {
            if (userChallenge && !userChallenge.is_completed && !this.hasActiveChallenge) {
              this.activeChallengeService.setActiveChallenge(challenge);
            }
            resolve();
          },
          error: (error) => {
            console.error('Erreur lors de la vérification du défi actif:', error);
            resolve();
          }
        });
      });
    });

    Promise.all(checkPromises).then(() => {
      console.log('🔍 All challenges checked');
    });
  }

  getChallengesByTarget(target: string) {
    this.challengeService.getChallengeByTarget(target).subscribe({
      next: (challenges) => {
        this.challenges = challenges;
        console.log('📋 Challenges loaded:', challenges);
        if (challenges.length > 0 && !this.hasActiveChallenge) {
          this.selectedChallenge = challenges[0];
        }
        this.checkActiveChallenges();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des défis:', error);
      }
    });
  }

  openChallengeModal(challenge: ChallengeEntity) {
    this.selectedChallenge = challenge;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedChallenge = null;
  }

  acceptChallenge() {
    if (this.selectedChallenge && this.user) {
      this.challengeService.acceptChallenge(this.selectedChallenge.id, this.user.id).subscribe({
        next: () => {
          this.closeModal();
          this.activeChallengeService.setActiveChallenge(this.selectedChallenge!);
          this.loadUserAndChallenges();
        },
        error: (error) => {
          console.error('Erreur lors de l\'acceptation du défi:', error);
        }
      });
    }
  }

  displayChallenge(challenge: ChallengeEntity) {
    this.selectedChallenge = challenge;
    this.showModal = true;
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
                this.activeChallengeService.clearActiveChallenge();
                this.loadUserAndChallenges();
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
      this.userService.getUserConnected().subscribe({
        next: (currentUser) => {
          const newPoints = currentUser.points + points;
          this.userService.updateUserPoints(this.user.id, newPoints).subscribe({
            next: () => {
              this.loadUserAndChallenges();
            },
            error: (error) => {
              console.error('Erreur lors de la mise à jour des points:', error);
            }
          });
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des points actuels:', error);
        }
      });
    }
  }
}
