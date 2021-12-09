package com.ironhack.finalProject.fileService.service.impl;

import com.ironhack.finalProject.fileService.dao.File;
import com.ironhack.finalProject.fileService.repository.FileRepository;
import com.ironhack.finalProject.fileService.service.interfaces.IFileService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.print.Doc;
import java.io.IOException;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class FileService implements IFileService {

    private final FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public Stream<File> getAllFiles() {
        return fileRepository.findAll().stream();
    }

    public File getFile(Long id) {
        Optional<File> existsFile = fileRepository.findById(id);
        if(existsFile.isPresent()) {
            return existsFile.get();
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no file associated with this id");
        }
    }

    public Long getLastIdStored() {
        return fileRepository.findAll().get(fileRepository.findAll().size()-1).getId();
    }

    // If it is an STL file, transforms the MultipartFile into a File object and saves it to the database
    public File storeFile(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        File newFile = new File(fileName, file.getContentType(), file.getBytes());
        return fileRepository.save(newFile);
    }

    public void deleteFile(Long id) {
        File file = getFile(id);
        fileRepository.delete(file);
    }

}
