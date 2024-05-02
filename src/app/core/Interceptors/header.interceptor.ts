// import { HttpInterceptorFn } from '@angular/common/http';
// import { request } from 'http';

// export const headerInterceptor: HttpInterceptorFn = (req, next) => {
//   const token = sessionStorage.getItem('token');

//   if (token) {
//     const clonereq = request.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   }

//   return next.handle(request);
// }
// };
