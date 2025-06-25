import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChallengeEntity } from '../entity/challenge.entity';
import { ChallengeService } from './challenge.service';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveChallengeService {
  private activeChallengeSubject = new BehaviorSubject<ChallengeEntity | null>(null);
  private durationSubject = new BehaviorSubject<number>(0);
  private timerInterval: any;
  private startTime: number = 0;

  constructor(
    private challengeService: ChallengeService,
    private userService: UserServiceService
  ) {
    // Restaurer l'état du défi actif depuis le localStorage au démarrage
    const savedChallenge = localStorage.getItem('activeChallenge');
    const savedStartTime = localStorage.getItem('challengeStartTime');

    if (savedChallenge && savedStartTime) {
      const challenge = JSON.parse(savedChallenge);
      this.startTime = Number(savedStartTime);
      const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);

      // Vérifier si le défi est expiré
      if (elapsedTime >= challenge.estimated_duration) {
        // Le défi est expiré, le nettoyer
        this.clearActiveChallenge();
        return;
      }

      this.activeChallengeSubject.next(challenge);
      this.durationSubject.next(elapsedTime);
      this.startTimer();
    }
  }

  getActiveChallenge(): Observable<ChallengeEntity | null> {
    return this.activeChallengeSubject.asObservable();
  }

  getDuration(): Observable<number> {
    return this.durationSubject.asObservable();
  }

  setActiveChallenge(challenge: ChallengeEntity) {
    this.startTime = Date.now();
    this.activeChallengeSubject.next(challenge);
    this.durationSubject.next(0);
    localStorage.setItem('activeChallenge', JSON.stringify(challenge));
    localStorage.setItem('challengeStartTime', this.startTime.toString());
    this.startTimer();
  }

  clearActiveChallenge() {
    this.activeChallengeSubject.next(null);
    this.durationSubject.next(0);
    this.startTime = 0;
    localStorage.removeItem('activeChallenge');
    localStorage.removeItem('challengeStartTime');
    this.stopTimer();
  }

  private async validateChallenge() {
    const activeChallenge = this.activeChallengeSubject.value;
    if (!activeChallenge) return;

    try {
      const user = await this.userService.getUserConnected().toPromise();
      if (!user) return;

      const userChallenge = await this.challengeService.getUserChallengeByUserAndChallenge(user.id, activeChallenge.id).toPromise();
      if (!userChallenge) return;

      await this.challengeService.completeUserChallenge(userChallenge.id, activeChallenge.points).toPromise();

      const newPoints = user.points + activeChallenge.points;
      await this.userService.updateUserPoints(user.id, newPoints).toPromise();

      this.clearActiveChallenge();
    } catch (error) {
      console.error('Erreur lors de la validation du défi:', error);
    }
  }

  private startTimer() {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
      this.durationSubject.next(elapsedTime);

      const activeChallenge = this.activeChallengeSubject.value;
      if (activeChallenge && elapsedTime >= activeChallenge.estimated_duration) {
        this.validateChallenge();
      }
    }, 1000);
  }

  private stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
} 