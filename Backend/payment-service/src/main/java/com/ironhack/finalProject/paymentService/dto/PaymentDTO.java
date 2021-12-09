package com.ironhack.finalProject.paymentService.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor

public class PaymentDTO {

    private String productName;

    private int quantity;

    private BigDecimal price;

    private Long detailsId;

    private Long userId;

    public PaymentDTO(String productName, BigDecimal price) {
        this.productName = productName;
        this.quantity = 1;
        this.price = price;
    }
}
