import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Figurine } from '../models/figurine.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class Figurines {}

@Injectable({ providedIn: 'root' })
export class FigurinesService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + 'miniatures/miniatures/';

  getAll(): Observable<Figurine[]> {
    return this.http.get<Figurine[]>(this.apiUrl);
  }

  getById(id: string): Observable<Figurine> {
    return this.http.get<Figurine>(`${this.apiUrl}${id}/`);
  }

  create(figure: Figurine): Observable<Figurine> {
    return this.http.post<Figurine>(this.apiUrl, figure);
  }

  update(id: string, figure: Figurine): Observable<Figurine> {
    return this.http.put<Figurine>(`${this.apiUrl}${id}/`, figure);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
