import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChallengeService } from '../../../core/services/challenge.service';
import { ChallengeEntity } from '../../../core/entity/challenge.entity';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-challenges',
  imports: [RouterModule, NgFor],
  templateUrl: './challenges.component.html',
  styleUrl: './challenges.component.scss'
})
export class ChallengesComponent {
  challenges: ChallengeEntity[] = [];

  constructor(private challengeService: ChallengeService) {
    this.challengeService.getChallenges().subscribe(challenges => this.challenges = challenges);
  }
}
