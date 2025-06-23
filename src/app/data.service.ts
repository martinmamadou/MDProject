import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../core/services/api-config.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiConfig.buildApiUrl('/users')}/admin`);
  }
}
