package com.ironhack.finalProject.paymentService.service.interfaces;

import com.ironhack.finalProject.paymentService.controller.dto.PaymentDTO;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface IPaymentService {

    //Session createSession(List<PaymentDTO> paymentDTOList) throws StripeException;
    PaymentIntent payment(PaymentDTO paymentDTO) throws StripeException;
    PaymentIntent confirm(String id) throws StripeException;
    PaymentIntent cancel(String id) throws StripeException;
}
