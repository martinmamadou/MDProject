import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000/users/admin';

  constructor( private http: HttpClient ) { }

  getData(): Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
}
