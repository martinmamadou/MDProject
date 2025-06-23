import { Injectable } from '@angular/core';
import { ChallengeCategoryEntity } from '../entity/challenge-category.entiy';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeCategoryService {

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  getChallengeCategories(): Observable<ChallengeCategoryEntity[]> {
    return this.http.get<ChallengeCategoryEntity[]>(`${this.apiConfig.buildApiUrl('/challenge-category')}`);
  }
}
