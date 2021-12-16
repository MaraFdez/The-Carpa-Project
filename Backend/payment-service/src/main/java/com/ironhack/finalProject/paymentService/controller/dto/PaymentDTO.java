package com.ironhack.finalProject.paymentService.controller.dto;

import com.ironhack.finalProject.paymentService.enums.Currency;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class PaymentDTO {

    private String description;
    private int amount;
    private Currency currency;

}
