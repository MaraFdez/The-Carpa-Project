package com.ironhack.finalProject.catalogService.service.interfaces;

import com.ironhack.finalProject.catalogService.dto.CatalogElement;
import com.ironhack.finalProject.catalogService.dto.DetailsDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ICatalogService {

    List<CatalogElement> getAllCatalogElements();
    CatalogElement getCatalogElement(Long id);
    void storeCatalogElement(DetailsDTO details, MultipartFile file);
    void deleteCatalogElement(Long detailsId);

}
