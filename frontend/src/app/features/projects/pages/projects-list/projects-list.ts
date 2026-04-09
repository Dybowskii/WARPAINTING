import { Component, inject } from '@angular/core';
import { ProjectCard } from '../../components/project-card/project-card';
import { ProjectsStore } from '../../store/projects.store';

@Component({
  selector: 'app-projects-list',
  imports: [ProjectCard],
  templateUrl: './projects-list.html',
  styleUrl: './projects-list.scss',
})
export class ProjectsList {
  store = inject(ProjectsStore);

  ngOnInit() {
    this.store.loadAll();
  }
}
