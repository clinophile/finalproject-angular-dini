import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  endpoint: string = 'https://paymentapi-dini.herokuapp.com/';
  header = new HttpHeaders().set('Content-Type', 'application/json');

  currentUser: {name: string, email: string, id: string} = {name:'', email:'', id:''}

  constructor(private http: HttpClient, private router: Router) { }

  handleError(error: HttpErrorResponse) {
    let msg ='';
 
    if(error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error code ${error.status}\n Message: ${error.message}`;
    }

    return throwError(msg);

  }
    
    getPayment(): Observable<any> {
      let api = `${this.endpoint}api/Payment`;

      return this.http.get(api, { headers: this.header})
      .pipe(
        map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
    }

    getPaymentById(id: number): Observable<any> {
      let api = `${this.endpoint}api/Payment/${id}`;

      return this.http.get(api, { headers: this.header})
      .pipe(
        map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
    }

    addPayment(payment: Payment){
      let api = `${this.endpoint}api/Payment`;
      return (this.http.post(api, payment).pipe(catchError(this.handleError)));
    }
  
    updatePayment(payment: Payment, id: number){
      let api = `${this.endpoint}api/Payment/${id}`;
      return (this.http.put(api, payment).pipe(catchError(this.handleError)));
    }
  
  
    deletePayment(id: number){
      let api = `${this.endpoint}api/Payment/${id}`;
      return (this.http.delete(api).pipe(catchError(this.handleError)))
    }
  

  
}
