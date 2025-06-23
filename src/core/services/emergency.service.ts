import { HttpClient } from '@angular/common/http';
import { EmergencyEntity } from '../entity/emergency.entity';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmergencyCategoryEntity } from '../entity/emergency-category.entity';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  getEmergency(): Observable<EmergencyEntity[]> {
    return this.http.get<EmergencyEntity[]>(`${this.apiConfig.buildApiUrl('/emergency')}`);
  }

  getEmergencyById(id: number): Observable<EmergencyEntity> {
    return this.http.get<EmergencyEntity>(`${this.apiConfig.buildApiUrl('/emergency')}/${id}`);
  }

  createEmergency(emergency: EmergencyEntity): Observable<EmergencyEntity> {
    return this.http.post<EmergencyEntity>(`${this.apiConfig.buildApiUrl('/emergency')}/create`, emergency);
  }

  updateEmergency(emergency: EmergencyEntity): Observable<EmergencyEntity> {
    return this.http.put<EmergencyEntity>(`${this.apiConfig.buildApiUrl('/emergency')}/edit/${emergency.id}`, emergency);
  }

  deleteEmergency(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiConfig.buildApiUrl('/emergency')}/remove/${id}`);
  }

  getEmergencyCategories(): Observable<EmergencyCategoryEntity[]> {
    return this.http.get<EmergencyCategoryEntity[]>(`${this.apiConfig.buildApiUrl('/emergency-category')}`);
  }

  getEmergencyByCategory(categoryId: number): Observable<EmergencyEntity[]> {
    return this.http.get<EmergencyEntity[]>(`${this.apiConfig.buildApiUrl('/emergency')}/category/${categoryId}`);
  }
}
