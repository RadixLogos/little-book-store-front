import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router  = inject(Router);
  const requiredRole = route.data['role'];
  console.log(requiredRole);
  const userRole = authService.getRole();
console.log(userRole);
  if(requiredRole.includes(userRole)){
    return true;
  }
  router.navigate(['/login'])
  return false;
  
};
