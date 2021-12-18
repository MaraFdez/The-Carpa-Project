import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentDTO } from 'src/app/interfaces/payment-dto';
import { PaymentIntent } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private baseUrl = 'http://localhost:8085/payment';

  constructor(private http: HttpClient) { }

  // createSession(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/create-checkout-session`)
  // }

  public payment(paymentIntent : PaymentDTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/intent`, paymentIntent);
  }

  public paymentConfirmation(id: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/confirm/${id}`, {});
  }

  public paymentCancellation(id: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/cancel/${id}`, {});
  }

}
