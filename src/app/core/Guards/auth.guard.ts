import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('token') : null;
  if(token){
    return true;
  }else{
    router.navigateByUrl('login')
    return false;
  }
};
