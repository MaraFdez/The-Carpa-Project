package com.ironhack.finalProject.paymentService.controller.impl;

import com.ironhack.finalProject.paymentService.dao.Details;
import com.ironhack.finalProject.paymentService.dao.Item;
import com.ironhack.finalProject.paymentService.message.ResponseMessage;
import com.ironhack.finalProject.paymentService.service.impl.ItemService;
import com.ironhack.finalProject.paymentService.service.interfaces.IItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.ws.rs.Path;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/purchase")
public class ItemController {

    private final IItemService itemService;

    public ItemController(IItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Item> getAllItems() {
        return this.itemService.getAllItems();
    }

    @GetMapping("/item/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Item getItemById(@PathVariable("id") Long id) {
        if (itemService.existsId(id)) {
            return itemService.getById(id).get();
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no item related to this id");
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ResponseMessage> save(@RequestBody Details details) {
        String message = "";
        try {
            itemService.save(details);
            message = "File created successfully: " + details.getProjectName();
            return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not save this item: " + details.getProjectName();
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItem(@PathVariable("id") Long id) {
        if (itemService.existsId(id)) {
            itemService.delete(id);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is no item related to this id");
        }
    }

}
