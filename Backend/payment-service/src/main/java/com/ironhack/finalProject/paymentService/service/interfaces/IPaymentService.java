package com.ironhack.finalProject.paymentService.service.interfaces;

import com.ironhack.finalProject.paymentService.dto.PaymentDTO;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;

import java.util.List;

public interface IPaymentService {

    Session createSession(List<PaymentDTO> paymentDTOList) throws StripeException;

}
