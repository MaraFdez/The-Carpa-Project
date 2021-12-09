package com.ironhack.finalProject.detailService.dao;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "details")
public class Details {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String projectName;

    private String description;

    private String image;

    private BigDecimal price;

    private LocalDate publicationDate;

    private Long fileId;

    public Details(String username, String projectName, String description, String image, BigDecimal price, Long fileId) {
        setUsername(username);
        setProjectName(projectName);
        setDescription(description);
        setImage(image);
        setPrice(price);
        setPublicationDate(LocalDate.now());
        setFileId(fileId);
    }

}
