import { inject, computed } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap } from 'rxjs';
import { CreateFigurineDto, Figurine } from '../models/figurine.model';
import { FigurinesService } from '../services/figurines';

interface FigurinesState {
  figurines: Figurine[];
  loading: boolean;
  error: string | null;
  selectedId: string | null;
}

const initialState: FigurinesState = {
  figurines: [],
  loading: false,
  error: null,
  selectedId: null,
};

export const FigurinesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ figurines, selectedId }) => ({
    selected: computed(() => figurines().find((f) => f.pk === selectedId()) ?? null),
    total: computed(() => figurines().length),
  })),
  withMethods((store, service = inject(FigurinesService)) => ({
    loadAll: rxMethod<void>(
      pipe(
        switchMap(() => {
          patchState(store, { loading: true, error: null });
          return service.getAll().pipe(
            tapResponse({
              next: (figurines) => {
                patchState(store, { figurines, loading: false });
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
              next: (figurine) => {
                patchState(store, {
                  figurines: [...store.figurines().filter((f) => f.pk !== figurine.pk), figurine],
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
    create: rxMethod<FormData>(
      pipe(
        switchMap((figurine) => {
          console.log('Creating figurine with data:', figurine);
          patchState(store, { loading: true, error: null });
          return service.create(figurine).pipe(
            tapResponse({
              next: (newFigurine) => {
                patchState(store, {
                  figurines: [...store.figurines(), newFigurine],
                  loading: false,
                });
              },
              error: () => {
                patchState(store, { error: 'Błąd tworzenia', loading: false });
              },
            }),
          );
        }),
      ),
    ),
    selectFigurine(id: string) {
      patchState(store, { selectedId: id });
    },
  })),
);
