package com.ironhack.finalProject.paymentService.dao;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class Item {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @NotBlank
        private String projectName;

        @NotNull
        private BigDecimal price;

        public Item(String projectName, BigDecimal price) {
                setProjectName(projectName);
                setPrice(price);
        }

}
