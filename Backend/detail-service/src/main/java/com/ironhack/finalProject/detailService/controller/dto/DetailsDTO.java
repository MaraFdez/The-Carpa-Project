package com.ironhack.finalProject.detailService.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class DetailsDTO {

    @NotBlank(message = "A username is required")
    @Size(max = 20, message = "Exceeds maximum value of 20 characters. Please try again.")
    private String username;

    @NotBlank(message = "A project name is required")
    @Size(max = 50, message = "Exceeds maximum value of 50 characters. Please try again.")
    private String projectName;

    @NotBlank(message = "A description is required")
    @Size(max = 250, message = "Exceeds maximum value of 250 characters. Please try again.")
    private String description;

    private String image;

    @NotNull(message = "You need to set a price")
    private BigDecimal price;

    @NotNull(message = "A file id is required")
    private Long fileId;

}
