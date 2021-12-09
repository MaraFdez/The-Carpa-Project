package com.ironhack.finalProject.fileService.service.interfaces;

import com.ironhack.finalProject.fileService.dao.File;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.stream.Stream;

public interface IFileService {

    File storeFile(MultipartFile file) throws IOException;
    File getFile(Long id);
    Long getLastIdStored();
    Stream<File> getAllFiles();
    void deleteFile(Long id);

}
