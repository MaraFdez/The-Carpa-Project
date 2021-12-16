package com.ironhack.finalProject.paymentService.service.interfaces;

import com.ironhack.finalProject.paymentService.dao.Details;
import com.ironhack.finalProject.paymentService.dao.Item;

import java.util.List;
import java.util.Optional;

public interface IItemService {

    List<Item> getAllItems();
    Optional<Item> getById(Long id);
    Item save(Details details);
    void delete(Long id);
    boolean existsId(Long id);
    boolean existsProjectName(String projectName);
}
