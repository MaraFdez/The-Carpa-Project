package com.ironhack.finalProject.catalogService.proxy;

import com.ironhack.finalProject.catalogService.dto.ResponseFileDTO;
import com.ironhack.finalProject.catalogService.message.ResponseMessage;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@FeignClient("FILE-SERVICE")
public interface FileProxy {

    @GetMapping("/file")
    ResponseEntity<List<ResponseFileDTO>> getListFiles();

    @GetMapping("/file/{id}")
    ResponseEntity<byte[]> getFile(@PathVariable Long id);

    @GetMapping("/file/lastId")
    Long getLastId();

    @PostMapping(value = "/file/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<ResponseMessage> uploadFile(@RequestBody MultipartFile file);

    @DeleteMapping("/file/{id}")
    void deleteFile(@PathVariable("id") Long id);

}
