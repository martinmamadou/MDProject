import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FumeurTypeEntity } from '../entity/fumeur-type.entity';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root'
})
export class FumeurTypeService {

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  getType(): Observable<FumeurTypeEntity[]> {
    return this.http.get<FumeurTypeEntity[]>(`${this.apiConfig.buildApiUrl('/fumeur-type')}/admin`);
  }
}