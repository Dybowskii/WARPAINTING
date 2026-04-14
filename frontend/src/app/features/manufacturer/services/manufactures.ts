import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/enviroments';
import { Observable } from 'rxjs';
import { Manufacturer } from '../models/manufacturer.model';

@Injectable({
  providedIn: 'root',
})
export class ManufacturesService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + 'miniatures/manufacturers/';

  getAll(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(this.apiUrl);
  }

  getById(id: string): Observable<Manufacturer> {
    return this.http.get<Manufacturer>(`${this.apiUrl}${id}/`);
  }
}
