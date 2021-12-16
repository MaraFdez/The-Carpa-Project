package com.ironhack.finalProject.paymentService.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class DetailsDTO {

    private String username;
    private String projectName;
    private String description;
    private BigDecimal price;
    private Long fileId;

    public DetailsDTO(String username, String projectName, String description, BigDecimal price) {
        setUsername(username);
        setProjectName(projectName);
        setDescription(description);
        setPrice(price);
    }
}
