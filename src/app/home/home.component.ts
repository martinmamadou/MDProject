import { Component } from '@angular/core';
import { UserEntity } from '../../core/entity/user.entity';
import { UserServiceService } from '../../core/services/user-service.service';
import { ChallengeEntity } from '../../core/entity/challenge.entity';
import { ChallengeService } from '../../core/services/challenge.service';
import { StatsEntity } from '../../core/entity/stats.entity';
import { StatsService } from '../../core/services/stats.service';
import { RewardEntity } from '../../core/entity/reward.entity';
import { RewardsService } from '../../core/services/rewards.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiConfigService } from '../../core/services/api-config.service';

/**
 * Composant principal de la page d'accueil utilisateur
 * Affiche le dashboard avec les informations personnelles, défis, récompenses et statistiques
 */
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // Propriétés pour stocker les données de l'utilisateur connecté
  user!: UserEntity;                    // Informations de l'utilisateur connecté
  challenge!: ChallengeEntity;          // Défi aléatoire affiché sur la page d'accueil
  rewards!: RewardEntity[];             // Liste des 5 récompenses aléatoires
  stats!: StatsEntity;                  // Statistiques personnelles de l'utilisateur

  // URL de l'image du logo (chemin relatif vers les assets)
  imageUrl = ('../../assets/img/Logo.png');

  /**
   * Constructeur du composant
   * Injection des services nécessaires pour récupérer les données
   * @param userService - Service pour gérer les données utilisateur
   * @param challengeService - Service pour gérer les défis
   * @param statsService - Service pour gérer les statistiques
   * @param rewardService - Service pour gérer les récompenses
   * @param router - Service de navigation Angular
   * @param apiConfig - Service de configuration d'API
   */
  constructor(
    private userService: UserServiceService,
    private challengeService: ChallengeService,
    private statsService: StatsService,
    private rewardService: RewardsService,
    private router: Router,
    private apiConfig: ApiConfigService
  ) {
  }

  /**
   * Méthode appelée lors de l'initialisation du composant
   * Charge toutes les données nécessaires pour afficher le dashboard
   */
  ngOnInit(): void {
    // Récupération des informations de l'utilisateur connecté
    this.userService.getUserConnected().subscribe((user) => {
      this.user = user;
      console.log(this.user);
      // Une fois l'utilisateur récupéré, on charge ses statistiques
      this.loadStats();
    });

    // Chargement d'un défi aléatoire pour motiver l'utilisateur
    this.loadRandomChallenge();

    // Chargement de 5 récompenses aléatoires pour donner envie à l'utilisateur
    this.loadRewards();
  }

  /**
   * Charge un défi aléatoire depuis l'API
   * Ce défi est affiché sur la page d'accueil pour motiver l'utilisateur
   */
  loadRandomChallenge() {
    this.challengeService.loadRandomChallenge().subscribe(res => {
      this.challenge = res;
      console.log(this.challenge);
    });
  }

  /**
   * Charge les statistiques personnelles de l'utilisateur
   * Nécessite que l'utilisateur soit déjà chargé (appelé dans ngOnInit)
   * Affiche les progrès : cigarettes évitées, argent économisé, jours sans fumer
   */
  loadStats() {
    // Vérification que l'utilisateur est bien chargé avant de récupérer ses stats
    this.statsService.getStatsByUserId(this.user.id).subscribe(res => {
      this.stats = res;
      console.log(this.stats);
    });
  }

  /**
   * Charge 5 récompenses aléatoires depuis l'API
   * Ces récompenses sont affichées pour donner envie à l'utilisateur de continuer
   * et d'accumuler des points pour les obtenir
   */
  loadRewards() {
    this.rewardService.LoadRandomRewardLimit5().subscribe(res => {
      this.rewards = res;
      console.log(this.rewards);
    });
  }

  /**
   * Construit l'URL complète de l'image d'une récompense
   * @param reward - L'objet récompense contenant le nom de l'image
   * @returns L'URL complète vers l'image stockée sur le serveur
   */
  getRewardImage(reward: RewardEntity): string {
    return this.apiConfig.buildImageUrl(reward.image_url);
  }

  /**
   * Navigue vers la page de détails d'une récompense
   * Appelée quand l'utilisateur clique sur une récompense
   * @param reward - La récompense sélectionnée par l'utilisateur
   */
  goToReward(reward: RewardEntity) {
    this.router.navigate(['/rewards/details', reward.id]);
  }
}

