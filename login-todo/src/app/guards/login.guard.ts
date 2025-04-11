import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = () => {

  const loginService = inject(LoginService);
  const router = inject(Router);

  if (!loginService.authUser()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
