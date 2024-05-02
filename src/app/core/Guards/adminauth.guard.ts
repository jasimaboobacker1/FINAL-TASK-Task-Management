import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminauthGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('name') : null;
  if(token){
    return true;
  }else{
    router.navigateByUrl('login')
    return false;
  }
};
