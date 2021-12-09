package com.ironhack.finalProject.detailService.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class UpgradableDetailsDTO {

    private String projectName;
    private String description;
    private String image;
    private BigDecimal price;

}
