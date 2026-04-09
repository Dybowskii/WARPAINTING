import { Routes } from '@angular/router';

export const FIGURINES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/figurines-list/figurines-list').then((m) => m.FigurinesList),
  },
  {
    path: 'new',
    loadComponent: () => import('./pages/figurine-form/figurine-form').then((m) => m.FigurineForm),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/figurine-detail/figurine-detail').then((m) => m.FigurineDetail),
  },
];
