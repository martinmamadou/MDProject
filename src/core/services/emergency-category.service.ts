import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmergencyCategoryEntity } from '../entity/emergency-category.entity';

@Injectable({
  providedIn: 'root'
})
export class EmergencyCategoryService {
  private apiUrl = 'http://localhost:3000/emergency-category';
  constructor(private http: HttpClient) { }

  getEmergencyCategories(): Observable<EmergencyCategoryEntity[]> {
    return this.http.get<EmergencyCategoryEntity[]>(`${this.apiUrl}`);
  }
}
