package com.ironhack.finalProject.paymentService.controller;

import com.ironhack.finalProject.paymentService.dto.PaymentDTO;
import com.ironhack.finalProject.paymentService.dto.StripeResponse;
import com.ironhack.finalProject.paymentService.service.interfaces.IPaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    private final IPaymentService paymentService;

    public PaymentController(IPaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // Create session using Stripe API
    @PostMapping("/create-checkout-session")
    public ResponseEntity<StripeResponse> checkoutList(@RequestBody List<PaymentDTO> paymentDTOList) throws StripeException {
        Session session = paymentService.createSession(paymentDTOList);
        StripeResponse stripeResponse = new StripeResponse(session.getId());
        // Send the Stripe session id in response
        return new ResponseEntity<StripeResponse>(stripeResponse, HttpStatus.OK);
    }

}
