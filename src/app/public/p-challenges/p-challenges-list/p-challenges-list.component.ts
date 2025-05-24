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

  currentTime = new Date();
  private timeInterval: any;

  constructor(
    private challengeService: ChallengeService,
    private userService: UserServiceService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private challengeCategoryService: ChallengeCategoryService
  ) { }

  ngOnInit() {
    console.log('🔍 Initial activeChallenge:', this.activeChallenge);
    this.loadUserAndChallenges();
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  private startTimeUpdate() {
    this.timeInterval = setInterval(() => {
      this.duration++;
      console.log("duration", this.duration);

      // Vérifier si la durée du défi est atteinte
      if (this.activeChallenge && this.duration >= this.activeChallenge.estimated_duration) {
        this.finishChallenge();
        clearInterval(this.timeInterval);
      }
    }, 1000);
  }

  private loadUserAndChallenges() {
    this.route.params.subscribe(params => {
      const categoryName = params['category'];
      this.userService.getUserConnected().subscribe({
        next: (user) => {
          this.user = user;
          if (user.smoker_type) {
            // D'abord obtenir l'ID de la catégorie
            this.challengeCategoryService.getChallengeCategories().subscribe(categories => {
              const category = categories.find(cat => cat.name === categoryName);
              if (category) {
                // Ensuite récupérer les challenges par catégorie avec l'ID
                this.challengeService.getChallengeByCategory(category.id).subscribe(categoryChallenges => {
                  console.log('📋 Challenges par catégorie:', categoryChallenges);
                  // Ensuite filtrer par le type de fumeur
                  this.challenges = categoryChallenges.filter(challenge =>
                    challenge.target === user.smoker_type
                  );
                  console.log('📋 Challenges filtrés:', this.challenges);
                  this.checkActiveChallenges();
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

    // On réinitialise l'état
    this.hasActiveChallenge = false;
    this.activeChallenge = null;

    // On crée un tableau de promesses pour tous les appels API
    const checkPromises = this.challenges.map(challenge => {
      return new Promise<void>((resolve) => {
        this.challengeService.getUserChallengeByUserAndChallenge(this.user.id, challenge.id).subscribe({
          next: (userChallenge) => {
            if (userChallenge && !userChallenge.is_completed && !this.hasActiveChallenge) {
              this.hasActiveChallenge = true;
              this.activeChallenge = challenge;
              console.log('✅ Active challenge found:', this.activeChallenge);
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

    // On attend que tous les appels soient terminés
    Promise.all(checkPromises).then(() => {
      console.log('🔍 All challenges checked. Active challenge:', this.activeChallenge);
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
        // On vérifie les défis actifs une fois que les défis sont chargés
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
          this.activeChallenge = this.selectedChallenge;
          this.hasActiveChallenge = true;
          // Réinitialiser la durée quand on accepte un nouveau défi
          console.log('🎯 Challenge accepted:', this.activeChallenge);
          this.loadUserAndChallenges();
          this.startTimeUpdate();
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
                this.hasActiveChallenge = false;
                this.activeChallenge = null;
                console.log('✅ Challenge finished, activeChallenge reset to:', this.activeChallenge);
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
