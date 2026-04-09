import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: ``,
    loadComponent: () =>
      import('./shared/layout/main-layout/main-layout').then((m) => m.MainLayout),
    children: [
      {
        path: 'figurines',
        loadChildren: () => import('./features/figurines/routes').then((m) => m.FIGURINES_ROUTES),
        data: { title: 'Figurines' },
      },
      {
        path: 'projects',
        loadChildren: () => import('./features/projects/routes').then((m) => m.PROJECTS_ROUTES),
        data: { title: 'Projects' },
      },
      {
        path: '',
        redirectTo: 'figurines',
        pathMatch: 'full',
      },
    ],
  },
];
