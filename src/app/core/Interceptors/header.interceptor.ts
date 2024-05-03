import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
    const myToken=localStorage.getItem('token');
    const clonerequest=req.clone({
      setHeaders:{
        Authorisation:`Bearer ${myToken}`
      }
    })
  return next(clonerequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.log(error);
        
      } else if (error.status === 500) {
       
      } else {
      }
      return throwError(error);
    })
  );
};
