import { CheckoutService } from './../../services/checkout/checkout.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
// import Stripe from 'stripe';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  // stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  //   apiVersion: "2020-08-27",
  //   typescript: true
  // });

  constructor(
    private checkoutService : CheckoutService
  ) { }

  ngOnInit(): void {
  }

  createSession() {
    this.checkoutService.createSession();
  }
}
