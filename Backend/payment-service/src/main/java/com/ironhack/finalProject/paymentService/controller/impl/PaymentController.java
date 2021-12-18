package com.ironhack.finalProject.paymentService.controller.impl;

import com.ironhack.finalProject.paymentService.controller.dto.PaymentDTO;
import com.ironhack.finalProject.paymentService.service.interfaces.IPaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/payment")
public class PaymentController {

    private final IPaymentService paymentService;

    public PaymentController(IPaymentService paymentService) {
        this.paymentService = paymentService;
    }

//    // Create session using Stripe API
//    @PostMapping("/create-checkout-session")
//    public ResponseEntity<StripeResponse> checkoutList(@RequestBody List<PaymentDTO> paymentDTOList) throws StripeException {
//        Session session = paymentService.createSession(paymentDTOList);
//        StripeResponse stripeResponse = new StripeResponse(session.getId());
//        // Send the Stripe session id in response
//        return new ResponseEntity<StripeResponse>(stripeResponse, HttpStatus.OK);
//    }

    @PostMapping("/intent")
    public ResponseEntity<String> payment(@RequestBody PaymentDTO paymentDTO) throws StripeException {
        PaymentIntent paymentIntent = paymentService.payment(paymentDTO);
        String paymentMessage = paymentIntent.toJson();
        return new ResponseEntity<String>(paymentMessage, HttpStatus.CONTINUE);
    }

    @PostMapping("/confirm/{id}")
    public ResponseEntity<String> confirm(@PathVariable("id") String id) throws StripeException {
        PaymentIntent paymentIntent = paymentService.confirm(id);
        String paymentMessage = paymentIntent.toJson();
        return new ResponseEntity<String>(paymentMessage, HttpStatus.ACCEPTED);
    }

    @PostMapping("/cancel/{id}")
    public ResponseEntity<String>  cancel(@PathVariable("id") String id) throws StripeException {
        PaymentIntent paymentIntent = paymentService.cancel(id);
        String paymentMessage = paymentIntent.toJson();
        return new ResponseEntity<String>(paymentMessage, HttpStatus.EXPECTATION_FAILED);
    }


}
