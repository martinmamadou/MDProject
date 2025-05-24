import { Injectable } from '@angular/core';
import { ChallengeCategoryEntity } from '../entity/challenge-category.entiy';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChallengeEntity } from '../entity/challenge.entity';
@Injectable({
  providedIn: 'root'
})
export class ChallengeCategoryService {
  private apiUrl = 'http://localhost:3000/challenge-category';
  constructor(private http: HttpClient) { }

  getChallengeCategories(): Observable<ChallengeCategoryEntity[]> {
    return this.http.get<ChallengeCategoryEntity[]>(`${this.apiUrl}`);
  }

}
