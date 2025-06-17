import { HttpClient } from '@angular/common/http';
import { EmergencyEntity } from '../entity/emergency.entity';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmergencyCategoryEntity } from '../entity/emergency-category.entity';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

  private apiUrl = 'http://localhost:3000/emergency';
  private apiUrlCategory = 'http://localhost:3000/emergency-category';
  constructor(private http: HttpClient) { }

  getEmergency(): Observable<EmergencyEntity[]> {
    return this.http.get<EmergencyEntity[]>(`${this.apiUrl}`);
  }

  getEmergencyById(id: number): Observable<EmergencyEntity> {
    return this.http.get<EmergencyEntity>(`${this.apiUrl}/${id}`);
  }

  createEmergency(emergency: EmergencyEntity): Observable<EmergencyEntity> {
    return this.http.post<EmergencyEntity>(`${this.apiUrl}/create`, emergency);
  }

  updateEmergency(emergency: EmergencyEntity): Observable<EmergencyEntity> {
    return this.http.put<EmergencyEntity>(`${this.apiUrl}/edit/${emergency.id}`, emergency);
  }

  deleteEmergency(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove/${id}`);
  }

  getEmergencyCategories(): Observable<EmergencyCategoryEntity[]> {
    return this.http.get<EmergencyCategoryEntity[]>(`${this.apiUrlCategory}`);
  }

  getEmergencyByCategory(categoryId: number): Observable<EmergencyEntity[]> {
    return this.http.get<EmergencyEntity[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  
}
