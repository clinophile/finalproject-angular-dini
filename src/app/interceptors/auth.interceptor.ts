import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Ambil data dari AuthService
    const authToken = this.auth.getToken();
    
    // Clone request, lalu isi Authorization sebagai salah satu HTTP Header
    request = request.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } })

    return next.handle(request);
  }
}

