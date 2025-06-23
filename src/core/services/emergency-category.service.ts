import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmergencyCategoryEntity } from '../entity/emergency-category.entity';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root'
})
export class EmergencyCategoryService {

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  getEmergencyCategories(): Observable<EmergencyCategoryEntity[]> {
    return this.http.get<EmergencyCategoryEntity[]>(`${this.apiConfig.buildApiUrl('/emergency-category')}`);
  }
}
