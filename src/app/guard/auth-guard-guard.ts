import { enableProdMode, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';
import { ToastMessage } from '../services/toast-message/toast-message';

export const authGuardGuard: CanActivateFn = (route, state) => {
  //inject the services for the authentication guard
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastMessage = inject(ToastMessage);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login-page']);
    toastMessage.warning('Please login to access this page', 'bottom');
    return false;
  } else {
    return true;
  }
};
