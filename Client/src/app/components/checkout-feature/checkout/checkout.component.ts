import { CatalogElement } from 'src/app/model/catalog-element.model';
import { WarehouseService } from 'src/app/services/warehouse/warehouse.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CheckoutService } from '../../../services/checkout/checkout.service';
import { StripeService  } from 'ngx-stripe';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeCardElement, StripeElements, StripeElementsOptions } from '@stripe/stripe-js';
import { PaymentDTO } from 'src/app/interfaces/payment-dto';
import { Location } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  elements!: StripeElements;
  card!: StripeCardElement;
  catalogElementId : number = 0;
  selectedCatalogElement! : CatalogElement;

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  error: any;

  constructor(
    private stripeService: StripeService,
    private checkoutService: CheckoutService,
    private warehouseService: WarehouseService,
    private route: ActivatedRoute,
    private router: Router,
    private location : Location
  ) { }

  public stripeForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.createCard();
    this.getElement();
  }

  createCard() {
    this.stripeService.elements(this.elementsOptions).subscribe(elements => {
      this.elements = elements;
      if (!this.card) {
        this.card = this.elements.create('card');
        this.card.mount('#card-element');
      }
    });
  }

  getElement() : void {
    this.catalogElementId = this.route.snapshot.params['id'];

    this.warehouseService.getCatalogElement(this.catalogElementId).subscribe(result => {
      let catalogElement : CatalogElement = new CatalogElement(
        result.id,
        result.username,
        result.projectName,
        result.description,
        result.image,
        result.price,
        result.publicationDate,
        result.data
      )
      this.selectedCatalogElement = catalogElement;
    });

  }

  paymentMethod() {
    const name = this.stripeForm.get('name')!.value;
    this.stripeService.createToken(this.card, { name }).subscribe(result => {
        if (result.token) {
          var paymentIntent: PaymentDTO = {
            token: result.token.id,
            amount: this.selectedCatalogElement.price*100,
            currency: 'EUR'
          };
        
          this.checkoutService.payment(paymentIntent).subscribe(result => {
            console.log(result.id);
          });

          this.catalogElementId = this.route.snapshot.params['id'];

          if (confirm('Are you sure you want to proceed with the payment?')) {
            this.checkoutService.paymentConfirmation(paymentIntent.token).subscribe();
            console.log('Payment confirmation.');
            this.router.navigate(['/' +  this.catalogElementId + '/checkout/success']);
          } else {
            this.checkoutService.paymentCancellation(paymentIntent.token).subscribe();
            console.log('Payment cancellation.');
          }

          this.error = undefined;
        } else if (result.error) {
          this.error = result.error.message;
        }
      });

  }

  goBack() : void {
    this.location.back();
  }

}
