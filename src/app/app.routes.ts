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
          import('./pages/room-detail/room-detail.page').then(
            (m) => m.RoomDetailPage
          ),
      },
    ],
  },
  {
    path: 'login-page',
    loadComponent: () => import('./pages/login-page/login-page.page').then( m => m.LoginPagePage)
  },
  {
    path: 'user-profile',
    loadComponent: () => import('./pages/user-profile/user-profile.page').then( m => m.UserProfilePage)
  },
  {
    path: 'signup-page',
    loadComponent: () => import('./pages/signup-page/signup-page.page').then( m => m.SignupPagePage)
  },
];
