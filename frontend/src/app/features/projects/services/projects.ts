import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../enviroments/enviroments';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + 'projects/projects/';

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}${id}/`);
  }

  create(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  update(id: string, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}${id}/`, project);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
