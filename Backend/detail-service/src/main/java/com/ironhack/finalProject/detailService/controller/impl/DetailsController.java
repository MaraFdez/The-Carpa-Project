package com.ironhack.finalProject.detailService.controller.impl;

import com.ironhack.finalProject.detailService.controller.dto.DetailsDTO;
import com.ironhack.finalProject.detailService.controller.dto.UpgradableDetailsDTO;
import com.ironhack.finalProject.detailService.dao.Details;
import com.ironhack.finalProject.detailService.repository.DetailsRepository;
import com.ironhack.finalProject.detailService.service.interfaces.IDetailsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/details")
public class DetailsController {

    private final DetailsRepository detailsRepository;
    private final IDetailsService detailsService;

    public DetailsController(DetailsRepository detailsRepository, IDetailsService detailsService) {
        this.detailsRepository = detailsRepository;
        this.detailsService = detailsService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Details> getAllDetails() {
        return detailsRepository.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Details getDetails(@PathVariable("id") Long id) {
        return detailsService.getDetails(id);
    }

    @GetMapping("/uploadedProjects/{username}")
    @ResponseStatus(HttpStatus.OK)
    public int getAmountOfUploadedProjects(@PathVariable("username") String username) {
        return detailsService.getAmountOfUploadedProjects(username);
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void uploadDetails(@PathVariable("id") Long id, @RequestBody UpgradableDetailsDTO upgradableDetailsDTO) {
        if(upgradableDetailsDTO.getProjectName() != null && upgradableDetailsDTO.getProjectName() != "") {
            detailsService.updateProjectName(id, upgradableDetailsDTO.getProjectName());
        }
        if(upgradableDetailsDTO.getDescription() != null && upgradableDetailsDTO.getDescription() != "") {
            detailsService.updateDescription(id, upgradableDetailsDTO.getDescription());
        }
        if(upgradableDetailsDTO.getImage() != null && upgradableDetailsDTO.getImage() != "") {
            detailsService.updateImageSrc(id, upgradableDetailsDTO.getImage());
        }
        if(upgradableDetailsDTO.getPrice() != null && upgradableDetailsDTO.getPrice().compareTo(new BigDecimal(0)) != -1 ) {
            detailsService.updatePrice(id, upgradableDetailsDTO.getPrice());
        }
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Details addDetails(@RequestBody @Valid DetailsDTO detailsDTO) {
        return detailsService.storeDetails(detailsDTO);
    }

    // Needed to post the information as a ModelAttribute from the edge service
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Details storeDetails(@ModelAttribute @Valid DetailsDTO detailsDTO) {
        return detailsService.storeDetails(detailsDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDetails(@PathVariable("id") Long id) {
        detailsService.deleteDetails(id);
    }


}
