import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'challenges';
  private readonly ACTIVE_CHALLENGE_KEY = 'activeChallenge';

  constructor() { }

  /**
   * Ajoute un challenge dans le localStorage
   * @param challenge Le challenge à stocker
   */
  addChallenge(challenge: any): void {
    const challenges = this.getChallenges();
    challenges.push(challenge);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(challenges));
  }

  /**
   * Récupère tous les challenges du localStorage
   * @returns La liste des challenges
   */
  getChallenges(): any[] {
    const challenges = localStorage.getItem(this.STORAGE_KEY);
    return challenges ? JSON.parse(challenges) : [];
  }

  /**
   * Supprime un challenge du localStorage
   * @param challengeId L'identifiant du challenge à supprimer
   */
  deleteChallenge(challengeId: string): void {
    const challenges = this.getChallenges();
    const filteredChallenges = challenges.filter(challenge => challenge.id !== challengeId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredChallenges));
  }

  /**
   * Récupère une valeur du localStorage
   * @param key La clé de la valeur à récupérer
   * @returns La valeur stockée ou null
   */
  get(key: string): string | null {
    return localStorage.getItem(key);
  }

  /**
   * Stocke une valeur dans le localStorage
   * @param key La clé sous laquelle stocker la valeur
   * @param value La valeur à stocker
   */
  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  /**
   * Supprime une valeur du localStorage
   * @param key La clé de la valeur à supprimer
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
