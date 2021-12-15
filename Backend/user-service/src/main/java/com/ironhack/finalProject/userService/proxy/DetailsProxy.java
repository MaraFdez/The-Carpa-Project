package com.ironhack.finalProject.userService.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("DETAIL-SERVICE")
public interface DetailsProxy {

    @GetMapping("details/uploadedProjects/{username}")
    public int getAmountOfUploadedProjects(@PathVariable("username") String username);

}
