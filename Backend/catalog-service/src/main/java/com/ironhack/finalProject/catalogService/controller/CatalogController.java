package com.ironhack.finalProject.catalogService.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ironhack.finalProject.catalogService.dto.CatalogElement;
import com.ironhack.finalProject.catalogService.dto.DetailsDTO;
import com.ironhack.finalProject.catalogService.message.ResponseMessage;
import com.ironhack.finalProject.catalogService.service.interfaces.ICatalogService;
import io.github.resilience4j.retry.annotation.Retry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/catalog")
public class CatalogController {

    Logger logger = LoggerFactory.getLogger("CatalogServiceApplication.class");

    private final ICatalogService catalogService;
    private final ObjectMapper objectMapper;

    public CatalogController(ICatalogService catalogService, ObjectMapper objectMapper) {
        this.catalogService = catalogService;
        this.objectMapper = objectMapper;
    }

    @GetMapping
    @Retry(name = "detail-service", fallbackMethod = "getAllFallbackMethod")
    @ResponseStatus(HttpStatus.OK)
    public List<CatalogElement> getAllCatalogElements() {
        return catalogService.getAllCatalogElements();
    }

    @GetMapping("/{id}")
    @Retry(name = "detail-service", fallbackMethod = "getDetailFallbackMethod")
    @ResponseStatus(HttpStatus.OK)
    public CatalogElement getCatalogElement(@PathVariable("id") Long id) {
        return catalogService.getCatalogElement(id);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ResponseMessage> uploadCatalogElement(@RequestParam("catalogElement") String details, @RequestParam("file") MultipartFile file){
        String message = "";
        try {
            DetailsDTO detailsDTO = objectMapper.readValue(details, DetailsDTO.class);
            catalogService.storeCatalogElement(detailsDTO, file);
            message = "Information stored successfully: " + detailsDTO.getUsername() + " -> " + detailsDTO.getProjectName()
                    + " / " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "The information could not be stored. Please, try again later";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @DeleteMapping("/{detailsId}")
    public void deleteCatalogElement(@PathVariable("detailsId") Long detailsId) {
        catalogService.deleteCatalogElement(detailsId);
    }

    // FALLBACK METHOD

    public List<CatalogElement> getAllFallbackMethod(Exception e) {
        logger.info("Fallback method called.");
        throw new ResponseStatusException(HttpStatus.EXPECTATION_FAILED, "Unable to connect to detail-service. Please, try again later");
    }

    public CatalogElement getDetailFallbackMethod(Exception e) {
        logger.info("Fallback method called.");
        throw new ResponseStatusException(HttpStatus.EXPECTATION_FAILED, "Unable to connect to detail-service. Please, try again later");
    }

}
