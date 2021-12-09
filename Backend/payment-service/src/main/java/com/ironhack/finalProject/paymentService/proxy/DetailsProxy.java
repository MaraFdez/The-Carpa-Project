package com.ironhack.finalProject.paymentService.proxy;

import com.ironhack.finalProject.paymentService.dao.Details;
import com.ironhack.finalProject.paymentService.dto.DetailsDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@FeignClient("DETAIL-SERVICE")
public interface DetailsProxy {

    @GetMapping("/details")
    List<Details> getAllDetails();

    @GetMapping("/details/{id}")
    Details getDetails(@PathVariable("id") Long id);

    @PostMapping(value = "/details", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    Details storeDetails(@RequestBody @Valid DetailsDTO details);

    @DeleteMapping("/details/{id}")
    void deleteDetails(@PathVariable("id") Long id);

}
