export const PROJECTS_ROUTES = [
  {
    path: '',
    loadComponent: () => import('./pages/projects-list/projects-list').then((m) => m.ProjectsList),
  },
];
