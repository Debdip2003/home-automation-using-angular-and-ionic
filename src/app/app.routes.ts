import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'room-detail/:id',
        loadComponent: () =>
          import('./pages/home/room-detail/room-detail.page').then(
            (m) => m.RoomDetailPage
          ),
      },
    ],
  },
];
