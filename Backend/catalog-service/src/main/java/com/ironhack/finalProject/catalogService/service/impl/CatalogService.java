package com.ironhack.finalProject.catalogService.service.impl;

import com.ironhack.finalProject.catalogService.dto.CatalogElement;
import com.ironhack.finalProject.catalogService.dto.Details;
import com.ironhack.finalProject.catalogService.dto.DetailsDTO;
import com.ironhack.finalProject.catalogService.proxy.DetailsProxy;
import com.ironhack.finalProject.catalogService.proxy.FileProxy;
import com.ironhack.finalProject.catalogService.service.interfaces.ICatalogService;
import io.github.resilience4j.retry.annotation.Retry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class CatalogService implements ICatalogService {

    Logger logger = LoggerFactory.getLogger("CatalogServiceApplication.class");

    private final FileProxy fileProxy;
    private final DetailsProxy detailsProxy;

    public CatalogService(FileProxy fileProxy, DetailsProxy detailsProxy) {
        this.fileProxy = fileProxy;
        this.detailsProxy = detailsProxy;
    }

    public List<CatalogElement> getAllCatalogElements() {
        List<Details> detailsList = detailsProxy.getAllDetails();
        List<CatalogElement> catalogElementList = new ArrayList<>();

        try {
            for (Details details : detailsList) {
                ResponseEntity<byte[]> dataFile = getFile(details.getFileId());
                CatalogElement catalogElement = new CatalogElement(details.getId(), details.getUsername(), details.getProjectName(),
                        details.getDescription(), details.getImage(), details.getPrice(), details.getPublicationDate(), dataFile.getBody());
                catalogElementList.add(catalogElement);
            }

        } catch(Exception e) {
            CatalogElement catalogElement = new CatalogElement();
            catalogElementList.add(catalogElement);
        }

        return catalogElementList;
    }

    @Retry(name = "file-service", fallbackMethod = "getFileFallbackMethod")
    public ResponseEntity<byte[]> getFile(Long id){
        return fileProxy.getFile(id);
    }

    public CatalogElement getCatalogElement(Long id) {
        Details details = detailsProxy.getDetails(id);

        try{
            ResponseEntity<byte[]> dataFile = getFile(details.getFileId());
            CatalogElement catalogElement = new CatalogElement(details.getId(), details.getUsername(), details.getProjectName(),
                    details.getDescription(), details.getImage(), details.getPrice(), details.getPublicationDate(), dataFile.getBody());
            return catalogElement;
        } catch(Exception e) {
            CatalogElement catalogElement = new CatalogElement();
            return catalogElement;
        }

    }

    public void storeCatalogElement(DetailsDTO details, MultipartFile file) {
        // First, the file is stored so we can catch its id
        fileProxy.uploadFile(file);
        Long fileId = fileProxy.getLastId();

        // Then, it is added to details
        details.setFileId(fileId);
        detailsProxy.storeDetails(details);
    }

    public void deleteCatalogElement(Long detailsId) {
        Long fileId = detailsProxy.getDetails(detailsId).getFileId();
        fileProxy.deleteFile(fileId);
        detailsProxy.deleteDetails(detailsId);
    }

    // FALLBACK METHODS

    public ResponseEntity<byte[]> getFileFallbackMethod(Exception e) {
        logger.info("Fallback method called.");
        throw new ResponseStatusException(HttpStatus.EXPECTATION_FAILED, "Unable to connect to file-service. Please, try again later");
    }

}
