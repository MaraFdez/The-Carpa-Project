package com.ironhack.finalProject.detailService.service.interfaces;

import com.ironhack.finalProject.detailService.controller.dto.DetailsDTO;
import com.ironhack.finalProject.detailService.dao.Details;
import com.ironhack.finalProject.detailService.repository.DetailsRepository;

import java.math.BigDecimal;

public interface IDetailsService {

    Details getDetails(Long id);
    int getAmountOfUploadedProjects(String username);
    Details storeDetails(DetailsDTO detailsDTO);
    void updateProjectName(Long id, String projectName);
    void updateDescription(Long id, String description);
    void updateImageSrc(Long id, String image);
    void updatePrice(Long id, BigDecimal price);
    void deleteDetails(Long id);

}
