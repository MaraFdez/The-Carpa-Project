package com.ironhack.finalProject.paymentService.service.impl;

import com.ironhack.finalProject.paymentService.dto.PaymentDTO;
import com.ironhack.finalProject.paymentService.service.interfaces.IPaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentService implements IPaymentService {

    @Value("${BASE_URL}")
    private String baseURL;

    @Value("${STRIPE_SECRET_KEY}")
    private String apiKey;

    // Set the currency and name of the product
    public SessionCreateParams.LineItem.PriceData createPriceData(PaymentDTO paymentDTO) {
        return SessionCreateParams.LineItem.PriceData.builder()
                .setCurrency("eur")
                .setUnitAmount(Long.valueOf(paymentDTO.getPrice().multiply(new BigDecimal(100)).toString()))
                .setProductData(
                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                .setName(paymentDTO.getProductName())
                                .build())
                .build();
    }

    // Return an object containing the quantity and price of a particular product
    public SessionCreateParams.LineItem createSessionLineItem(PaymentDTO paymentDTO) {
        return SessionCreateParams.LineItem.builder()
                // Set price for each product
                .setPriceData(createPriceData(paymentDTO))
                // Set quantity for each product
                .setQuantity(Long.parseLong(String.valueOf(paymentDTO.getQuantity())))
                .build();
    }

    // Create session for a particular payment session
    public Session createSession(List<PaymentDTO> paymentDTOList) throws StripeException {

        // Supply success and failure url for stripe
        String successURL = baseURL + "payment/success";
        String failedURL = baseURL + "payment/failed";

        // Set the private key
        Stripe.apiKey = apiKey;

        List<SessionCreateParams.LineItem> sessionItemsList = new ArrayList<>();
        for (PaymentDTO paymentDTO : paymentDTOList) {
            sessionItemsList.add(createSessionLineItem(paymentDTO));
        }

        // build the session param
        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setCancelUrl(failedURL)
                .addAllLineItem(sessionItemsList)
                .setSuccessUrl(successURL)
                .build();
        return Session.create(params);
    }

}
