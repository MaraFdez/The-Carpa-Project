package com.ironhack.finalProject.catalogService.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class FileDTO {

    private ResponseEntity<byte[]> data;

}
