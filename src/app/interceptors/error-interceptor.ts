import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
export const errorInterceptor: HttpInterceptorFn = (req, next) => {

const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError(error =>{
      if(error.status === 401 || error.status === 403 ){
        authService.logout();
        router.navigate(['/login']);
      }
    return throwError( () => error);
    })
  );
};
