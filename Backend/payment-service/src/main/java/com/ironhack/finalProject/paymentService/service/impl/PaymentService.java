package com.ironhack.finalProject.paymentService.service.impl;

import com.ironhack.finalProject.paymentService.controller.dto.PaymentDTO;
import com.ironhack.finalProject.paymentService.service.interfaces.IPaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService implements IPaymentService {

    @Value("${STRIPE_SECRET_KEY}")
    private String secretKey;


    public PaymentIntent payment(PaymentDTO paymentDTO) throws StripeException {
        Stripe.apiKey = secretKey;
        PaymentIntent paymentIntent = new PaymentIntent();
        Map<String, Object> params = new HashMap<>();
        params.put("token", paymentDTO.getDescription());
        params.put("amount", paymentDTO.getAmount());
        params.put("currency", paymentDTO.getCurrency());
        ArrayList payment_method_types = new ArrayList();
        payment_method_types.add("card");
        params.put("payment_method_types", payment_method_types);
        return paymentIntent.create(params);
    }

    public PaymentIntent confirm(String id) throws StripeException {
        Stripe.apiKey = secretKey;
        PaymentIntent paymentIntent = PaymentIntent.retrieve(id);
        Map<String, Object> params = new HashMap<>();
        params.put("payment_method", "pm_card_visa");
        paymentIntent.confirm(params);
        return paymentIntent;
    }

    public PaymentIntent cancel(String id) throws StripeException {
        Stripe.apiKey = secretKey;
        PaymentIntent paymentIntent = PaymentIntent.retrieve(id);
        paymentIntent.cancel();
        return paymentIntent;
    }

}
