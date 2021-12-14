/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  // Kita gunakan ini pada Session26Module (session26.module.ts)
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true 
  }
];