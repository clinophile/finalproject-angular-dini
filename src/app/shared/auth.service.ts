import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import {catchError, map} from 'rxjs/operators'
import { Router } from '@angular/router';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'https://paymentapi-dini.herokuapp.com/';
  header = new HttpHeaders().set('Content-Type', 'application/json');

  currentUser: {name: string, email: string, id: string} = {name:'', email:'', id:''}

  constructor(private http: HttpClient, private router: Router) { }

  signUp(user: User) : Observable<any> {
    let api = `${this.endpoint}api/AuthManagement/Register`;
    return this.http.post(api, user).pipe(catchError(this.handleError))
    
  }

  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}api/AuthManagement/Login`, user).pipe(catchError(this.handleError))
  }

    getToken() {
      return localStorage.getItem('access_token');
    }

    setAuthorizationToken (token: string) {
      return localStorage.setItem('access_token', token)
    }



    get isAuthenticated() {
      return !!this.getToken()
    }

  handleError(error: HttpErrorResponse) {
    let msg ='';
 
    if(error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error code ${error.status}\n Message: ${error.message}`;
    }

    return throwError(msg);

  }
 
  }
  