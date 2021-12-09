package com.ironhack.finalProject.fileService.controller;

import com.ironhack.finalProject.fileService.dao.File;
import com.ironhack.finalProject.fileService.message.ResponseFile;
import com.ironhack.finalProject.fileService.message.ResponseMessage;
import com.ironhack.finalProject.fileService.service.interfaces.IFileService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/file")
public class FileController {

    private final IFileService fileService;

    public FileController(IFileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping
    public ResponseEntity<List<ResponseFile>> getListFiles() {
        List<ResponseFile> files = fileService.getAllFiles().map(dbFile -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/files/")
                    .path(dbFile.getId().toString())
                    .toUriString();

            return new ResponseFile(
                    dbFile.getName(),
                    fileDownloadUri,
                    dbFile.getType(),
                    dbFile.getData().length);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(files);
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
        File file = fileService.getFile(id);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(file.getType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(file.getData());
    }

    @GetMapping("/lastId")
    @ResponseStatus(HttpStatus.OK)
    public Long getLastId() {
        return fileService.getLastIdStored();
    }

    @PostMapping("/upload")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ResponseMessage> uploadFile(@RequestBody MultipartFile file) {
        String message = "";
//        if(file.getContentType().equals("model/stl")) {

            try {
                fileService.storeFile(file);
                message = "File uploaded successfully: " + file.getOriginalFilename();
                return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseMessage(message));
            } catch (Exception e) {
                message = "Could not upload the file: " + file.getOriginalFilename();
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
            }

//        } else {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Please, upload an STL file");
//        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFile(@PathVariable("id") Long id) {
        fileService.deleteFile(id);
    }
}
