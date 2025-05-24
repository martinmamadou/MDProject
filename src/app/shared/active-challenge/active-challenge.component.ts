import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveChallengeService } from '../../../core/services/active-challenge.service';
import { ChallengeEntity } from '../../../core/entity/challenge.entity';

@Component({
  selector: 'app-active-challenge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-challenge.component.html',
  styleUrls: ['./active-challenge.component.scss']
})
export class ActiveChallengeComponent implements OnInit, OnDestroy {
  activeChallenge: ChallengeEntity | null = null;
  duration: number = 0;

  constructor(private activeChallengeService: ActiveChallengeService) { }

  ngOnInit() {
    this.activeChallengeService.getActiveChallenge().subscribe(challenge => {
      this.activeChallenge = challenge;
    });

    this.activeChallengeService.getDuration().subscribe(duration => {
      this.duration = duration;
    });
  }

  get remainingTime(): number {
    if (!this.activeChallenge) return 0;
    return Math.max(0, this.activeChallenge.estimated_duration - this.duration);
  }

  get progressPercentage(): number {
    if (!this.activeChallenge) return 0;
    return (this.duration / this.activeChallenge.estimated_duration) * 100;
  }

  ngOnDestroy() {
    // Pas besoin de nettoyer les souscriptions car le service est global
  }
} 