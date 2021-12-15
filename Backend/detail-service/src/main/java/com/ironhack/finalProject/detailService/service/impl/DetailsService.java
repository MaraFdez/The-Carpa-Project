package com.ironhack.finalProject.detailService.service.impl;

import com.ironhack.finalProject.detailService.controller.dto.DetailsDTO;
import com.ironhack.finalProject.detailService.dao.Details;
import com.ironhack.finalProject.detailService.repository.DetailsRepository;
import com.ironhack.finalProject.detailService.service.interfaces.IDetailsService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class DetailsService implements IDetailsService {

    private final DetailsRepository detailsRepository;

    public DetailsService(DetailsRepository detailsRepository) {
        this.detailsRepository = detailsRepository;
    }

    public Details getDetails(Long id) {
        Optional<Details> details = detailsRepository.findById(id);
        if (details.isPresent()) {
            return details.get();
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There are no details associated with this id");
        }
    }

    public int getAmountOfUploadedProjects(String username) {
        List<Details> detailsArray = detailsRepository.findByUsername(username);
        return detailsArray.size();
    };

    public Details storeDetails(DetailsDTO detailsDTO) {
        Details details =
                new Details(detailsDTO.getUsername(), detailsDTO.getProjectName(), detailsDTO.getDescription(),
                        detailsDTO.getImage(), detailsDTO.getPrice(), detailsDTO.getFileId());
        detailsRepository.save(details);
        return details;
    }

    public void updateProjectName(Long id, String projectName) {
        Details details = getDetails(id);
        details.setProjectName(projectName);
        detailsRepository.save(details);
    }

    public void updateDescription(Long id, String description) {
        Details details = getDetails(id);
        details.setDescription(description);
        detailsRepository.save(details);
    }

    public void updateImageSrc(Long id, String image) {
        Details details = getDetails(id);
        details.setImage(image);
        detailsRepository.save(details);
    }

    public void updatePrice(Long id, BigDecimal price) {
        Details details = getDetails(id);
        details.setPrice(price);
        detailsRepository.save(details);
    }

    public void deleteDetails(Long id) {
        Details details = getDetails(id);
        detailsRepository.delete(details);
    }

}
