import { Routes } from '@angular/router';
import { authGuardGuard } from './guard/auth-guard-guard';

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
        canActivate: [authGuardGuard],
      },
      {
        path: 'room-detail/:id',
        loadComponent: () =>
          import('./pages/room-detail/room-detail.page').then(
            (m) => m.RoomDetailPage
          ),
        canActivate: [authGuardGuard],
      },
    ],
  },
  {
    path: 'login-page',
    loadComponent: () =>
      import('./pages/login-page/login-page.page').then((m) => m.LoginPagePage),
  },
  {
    path: 'user-profile',
    loadComponent: () =>
      import('./pages/user-profile/user-profile.page').then(
        (m) => m.UserProfilePage
      ),
    canActivate: [authGuardGuard],
  },
  {
    path: 'signup-page',
    loadComponent: () =>
      import('./pages/signup-page/signup-page.page').then(
        (m) => m.SignupPagePage
      ),
  },
];
