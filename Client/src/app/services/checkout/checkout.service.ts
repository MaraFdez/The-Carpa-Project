import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private baseUrl = 'http://localhost:8000/payment';

  constructor(private http: HttpClient) { }

  createSession(): Observable<any> {
    return this.http.get(`${this.baseUrl}/create-checkout-session`)
  }

}
