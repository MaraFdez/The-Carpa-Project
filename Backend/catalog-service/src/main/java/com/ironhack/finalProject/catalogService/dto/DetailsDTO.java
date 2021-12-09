package com.ironhack.finalProject.catalogService.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Optional;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class DetailsDTO {

    private String username;
    private String projectName;
    private String description;
    private String image;
    private BigDecimal price;
    private Long fileId;

    public DetailsDTO(String username, String projectName, String description, String image, BigDecimal price) {
        setUsername(username);
        setProjectName(projectName);
        setDescription(description);
        setImage(image);
        setPrice(price);
    }
}
