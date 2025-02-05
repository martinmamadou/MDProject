import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FumeurTypeEntity } from '../entity/fumeur-type.entity';


@Injectable({
  providedIn: 'root'
})
export class FumeurTypeService {
private apiUrl = 'http://localhost:3000/fumeur-type/admin';

  constructor(private http: HttpClient) {}

    getType(){
        return this.http.get<FumeurTypeEntity[]>(this.apiUrl)
    }
}