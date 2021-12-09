package com.ironhack.finalProject.catalogService.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class CatalogElement {

    private Long id;
    private String username;
    private String projectName;
    private String description;
    private String image;
    private BigDecimal price;
    private LocalDate publicationDate;
    private byte[] data;

}
