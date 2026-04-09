import { inject, computed } from '@angular/core';
import { withComputed, withState, signalStore, withMethods, patchState } from '@ngrx/signals';
import { Project } from '../models/project.model';
import { ProjectsService } from '../services/projects';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
ProjectsService;

interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  selectedId: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
  selectedId: null,
};

export const ProjectsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ projects, selectedId }) => ({
    selected: computed(() => projects().find((p) => p.pk === selectedId()) ?? null),
    total: computed(() => projects().length),
  })),
  withMethods((store, service = inject(ProjectsService)) => ({
    loadAll: rxMethod<void>(
      pipe(
        switchMap(() => {
          patchState(store, { loading: true, error: null });
          return service.getAll().pipe(
            tapResponse({
              next: (projects) => {
                patchState(store, { projects, loading: false });
              },
              error: () => {
                patchState(store, { error: 'Błąd ładowania', loading: false });
              },
            }),
          );
        }),
      ),
    ),
    loadById: rxMethod<string>(
      pipe(
        switchMap((id) => {
          patchState(store, { loading: true, error: null });
          return service.getById(id).pipe(
            tapResponse({
              next: (project) => {
                patchState(store, {
                  projects: [...store.projects().filter((p) => p.pk !== project.pk), project],
                  loading: false,
                });
              },
              error: () => {
                patchState(store, { error: 'Błąd ładowania', loading: false });
              },
            }),
          );
        }),
      ),
    ),
  })),
);
