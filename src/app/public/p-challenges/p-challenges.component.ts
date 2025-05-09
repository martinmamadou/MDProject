import { Component, OnInit } from '@angular/core';
import { ChallengeEntity } from '../../../core/entity/challenge.entity';
import { ChallengeService } from '../../../core/services/challenge.service';
import { UserServiceService } from '../../../core/services/user-service.service';
import { UserEntity } from '../../../core/entity/user.entity';
import { NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-p-challenges',
  imports: [NgFor, RouterOutlet],
  templateUrl: './p-challenges.component.html',
  styleUrl: './p-challenges.component.scss'
})
export class PChallengesComponent implements OnInit {
  challenges: ChallengeEntity[] = [];
  user!: UserEntity;

  constructor(
    private challengeService: ChallengeService,
    private userService: UserServiceService
  ) { }

  ngOnInit() {
    this.loadUserAndChallenges();
  }

  private loadUserAndChallenges() {
    this.userService.getUserConnected().subscribe({
      next: (user) => {
        this.user = user;
        if (user.smoker_type) {
          this.getChallengesByTarget(user.smoker_type);
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'utilisateur:', error);
      }
    });
  }

  getChallengesByTarget(target: string) {
    this.challengeService.getChallengeByTarget(target).subscribe({
      next: (challenges) => {
        this.challenges = challenges;
        console.log('Défis chargés:', this.challenges);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des défis:', error);
      }
    });
  }
}
