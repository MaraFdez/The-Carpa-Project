package com.ironhack.finalProject.catalogService.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Details {

    private Long id;
    private String username;
    private String projectName;
    private String description;
    private String image;
    private BigDecimal price;
    private LocalDate publicationDate;
    private Long fileId;

}
